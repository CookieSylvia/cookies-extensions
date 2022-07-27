import {
    MangaTile,
    RequestManager,
    SourceStateManager, 
} from 'paperback-extensions-common'
import {
    getAlwaysFallback,
    getLanguage,
    getSearchSuffix,
    getSorting, 
} from '../Settings'
import { Data } from '../SourceData'
import {
    checkCloudflare,
    dumbify, 
} from '../Utils'
import { BookParser } from './BookParser'
import { LangDefs } from './Language'
import { Requests } from './Requests'
import { SortDefs } from './Sorting'

/**
 * The options used for finer control over the search.
 * Used in {@link SearchModel.create} or {@link SearchModel.createWithSettings} to
 * create a {@link SearchContext}
 */
export interface SearchOptions {
    /**
     * A raw text suffix to include.
     */
    suffix?: string
    /**
     * Either an object for include & exclude,
     * or an array for include only (Include takes priority).
     * If any of the included languages start with an underscore '_'
     * then all language tags will be ignored (No filtering).
     */
    // prettier-ignore
    languages?: {
        include?: string[]
        exclude?: string[]
    } | string[]
    /**
     * How the results should be sorted.
     */
    sorting?: string
    /**
     * What the search should be in case that it
     * is empty. (Empty searches results in errors)
     */
    empty?: string
}

/**
 * The context created using {@link SearchModel.create} with {@link SearchOptions}
 */
export interface SearchContext {
    /**
     * The full query created using {@link SearchModel.create},
     * or a bookId if {@link SearchContext.bookId} is true.
     */
    text: string
    /**
     * Determines wether the query should be used to
     * request the book directly.
     */
    bookId?: boolean
    /**
     * How the results should be sorted.
     */
    sorting?: string
}

/**
 * The objects used for searching.
 */
export interface SearchObjects {
    /**
     * The usual request manager for API requests.
     */
    requests: RequestManager
    /**
     * The state manager for source settings.
     */
    states?: SourceStateManager
    /**
     * The Cheerio API for scraping fallback requests for
     * useful data. (Required for fallback)
     */
    cheerio?: CheerioAPI
    /**
     * The request manager to use for fallback requests.
     * The usual request manager will be used if this is not set.
     */
    fallback?: RequestManager
}

/**
 * The metadata used for persistance between searches.
 */
export interface SearchMetadata {
    nextPage?: number
    maxPage?: number
    shouldStop?: boolean
    reason?: string
}

/**
 * The results of a search.
 */
export interface SearchResults {
    metadata: SearchMetadata
    data: string
    /**
     * The result of the search.
     * If this is undefined then the search has finished/ended correctly.
     */
    tiles?: MangaTile[]
}

export interface SearchModel {
    search: (ctx: SearchContext, options: SearchObjects, metadata?: SearchMetadata) => Promise<SearchResults>
    /**
     * Creates a {@link SearchContext} using {@link SearchOptions}.
     * This method ignores in-app settings, use {@link createWithSettings} instead, if possible.
     */
    create: (text?: string, options?: SearchOptions) => SearchContext
    /**
     * Creates a {@link SearchContext} using {@link SearchOptions} & in-app settings.
     * Used to provide in-app settings for the search.
     */
    createWithSettings: (states: SourceStateManager, text?: string, options?: SearchOptions) => Promise<SearchContext>
}

/**
 * Empty queries results in an error, so we get
 * around this error by searching for something
 * all books has when empty.
 * (In this case 'pages:>0')
 */
export const EmptySearch = Data.nhentai.empty_search

// The nhentai api is veery unstable when searching, and fails often
// so we scrape the site as a fallback when we get expected errors.
// As a last resort, the page will be outright skipped.
export const Search: SearchModel = {
    search: async (ctx: SearchContext, options: SearchObjects, metadata?: SearchMetadata): Promise<SearchResults> => {
        let nextPage = metadata?.nextPage ?? 1
        const maxPage = metadata?.maxPage ?? nextPage
        const shouldStop = metadata?.shouldStop ?? nextPage > maxPage

        if (shouldStop) {
            return {
                data: 'Search should stop',
                metadata: {
                    shouldStop: true,
                },
            }
        }

        if (ctx.bookId ?? false) {
            const data = await Requests.book(options.requests, ctx.text)
            checkCloudflare(data.status)

            if (data.parsed != undefined) {
                return {
                    tiles: [BookParser.tile(data.parsed)],
                    data: data.data,
                    metadata: {
                        shouldStop: true,
                    },
                }
            }
            if (data.status === 404) {
                return {
                    data: `BookId ${ctx.text} does not exist`,
                    metadata: {
                        shouldStop: true,
                    },
                }
            }
            throw new Error(`Search Error ${data.status}: ${data.data}`)
        }

        while (nextPage <= maxPage) {
            // Api

            const fallbackOnly = options.states != undefined ? await getAlwaysFallback(options.states) : false

            if (!fallbackOnly) {
                const data = await Requests.search(options.requests, ctx.text, nextPage, ctx.sorting)
                checkCloudflare(data.status)

                if (data.parsed != undefined) {
                    return {
                        tiles: BookParser.tiles(data.parsed),
                        data: data.data,
                        metadata: {
                            nextPage: nextPage + 1,
                            maxPage: data.parsed.pages,
                            shouldStop: nextPage + 1 > data.parsed.pages,
                        },
                    }
                }

                if (data.status != 404) {
                    throw new Error(`Search Error ${data.status}: ${data.data}`)
                }

                console.log(`Unable to find page ${nextPage} using api, trying with fallback.`)
            } else {
                // This will be spammed, which is *fine* as this is only for debugging.
                console.log('[Warn] Always fallback is enabled')
            }

            if (options.cheerio == undefined) {
                if (fallbackOnly) {
                    throw new Error('Cheerio is required for always fallback.')
                }
                console.log(`Cheerio required for fallback is disabled, skipping page ${nextPage}`)
                nextPage++
                continue
            }

            // Fallback

            // Using the normal Request Manager can easily
            // go over the rate limit, and should ideally
            // never be used for fallback.
            const fdata = await Requests.searchFallback(
                options.fallback ?? options.requests,
                options.cheerio,
                ctx.text,
                nextPage,
                ctx.sorting,
            )
            checkCloudflare(fdata.status)

            if (fdata.parsed != undefined) {
                return {
                    tiles: fdata.parsed.map((tile) => BookParser.tileFallback(tile)),
                    data: fdata.data,
                    metadata: {
                        nextPage: nextPage + 1,
                        maxPage: metadata?.maxPage,
                        shouldStop: metadata?.maxPage ? nextPage + 1 > metadata.maxPage : undefined,
                    },
                }
            }

            // 429 happens when we reach the rate limit.
            if (fdata.status != 404 && fdata.status != 429) {
                throw new Error(`Search Error (fallback) ${fdata.status}: ${fdata.data}`)
            }

            // Try the next page.
            console.log(`Couldn't find page ${nextPage}, skipping to the next.`)
            nextPage++
        }

        return {
            data: 'End of pages',
            metadata: { shouldStop: true },
        }
    },

    create: (text?: string, options?: SearchOptions): SearchContext => {
        if (text != undefined && /^\d+$/.test(text)) {
            return {
                text: text,
                bookId: true,
            }
        }

        const langs = options?.languages

        // include = options.langauages | ...languages.include
        const includedLangs = (Array.isArray(langs) ? langs : langs?.include) ?? []

        // exclude = options.languages.exclude
        // exclude -= include
        // exclude -= $item.startsWith('_')
        const excludedLangs =
            (!Array.isArray(langs) ? langs?.exclude ?? [] : []).filter(
                (lang) => !lang.startsWith('_') && !includedLangs.includes(lang),
            ) ?? []

        const includeAll = includedLangs.find((lang) => lang.startsWith('_')) != undefined
        const suffix = options?.suffix ?? ''
        const sorting = SortDefs.find(options?.sorting)

        const includeLangStr = `${LangDefs.stringify(includedLangs, false)}`
        const excludeLangStr = `${LangDefs.stringify(excludedLangs, true)}`
        const langStr = !includeAll ? `${includeLangStr} ${excludeLangStr}`.trim() : ''

        const extras = `${langStr} ${suffix}`.trim()
        return {
            text: dumbify(text != undefined ? `${text} ${extras}`.trim() : extras) || options?.empty || EmptySearch,
            sorting,
        }
    },

    createWithSettings: async (
        states: SourceStateManager,
        text?: string,
        options?: SearchOptions,
    ): Promise<SearchContext> => {
        let langs = options?.languages
        if (!Array.isArray(langs)) {
            // Ensure defined & remove possible references
            langs = { ...langs }
            if (
                (langs.exclude == undefined || LangDefs.getFilteredSources(langs.exclude, false, false).length <= 0) &&
                (langs.include == undefined || LangDefs.getFilteredSources(langs.include).length <= 0)
            ) {
                langs.include = [...(langs.include ?? []), await getLanguage(states)]
            }
        } else if (LangDefs.getFilteredSources(langs).length <= 0) {
            langs = [await getLanguage(states)]
        }
        return Search.create(text, {
            suffix: options?.suffix ?? (await getSearchSuffix(states)),
            languages: langs,
            sorting: options?.sorting ?? (await getSorting(states)),
            empty: options?.empty,
        })
    },
}
