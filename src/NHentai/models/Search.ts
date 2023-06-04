import {
    MangaTile,
    RequestManager,
    SourceStateManager, 
} from 'paperback-extensions-common'
import { Data } from '../Data'
import {
    getAlwaysFallback,
    getLanguage,
    getSearchSuffix,
    getSorting, 
} from '../Settings'
import {
    asArray,
    checkCloudflare, 
} from '../Utils'
import { BookParser } from './BookParser'
import { LangDefs } from './Languages'
import { Requests } from './Requests'
import { SortDefs } from './Sorting'

/**
 * The options used for finer control over the search.
 * Used in {@link Search.create} or {@link Search.createWithSettings} to
 * create a {@link SearchContext}
 */
export interface SearchOptions {
    /**
     * Either an object for include & exclude,
     * an array for include,
     * or a string for single included language.\
     * If any of the included languages start with an underscore '_'
     * then all language tags will be ignored. (Unfiltered)
     */
    languages?: LanguageOptions
    /**
     * How the results should be sorted.
     */
    sort?: string
    /**
     * A raw text suffix to include.
     */
    suffix?: string
    /**
     * What the search should be in case that it
     * is empty. (Empty searches results in errors)
     */
    empty?: string
}

/**
 * The language options of {@link SearchOptions}.
 */
// prettier-ignore
export type LanguageOptions = {
    include?: string[] | string
    exclude?: string[] | string
} | string[] | string

/**
 * The language context, these are gotten from {@link LanguageOptions}
 * for easier usage.
 */
export interface LanguageContext {
    /**
     * The included languages. (sorted & filtered)
     */
    include: string[]
    /**
     * The excluded languages. (sorted & filtered)
     */
    exclude: string[]
    /**
     * Wether the context is considered 'empty' and
     * can be replaced by a default instead.
     */
    empty: boolean
}

/**
 * The context created using {@link Search.create} with {@link SearchOptions}
 */
export interface SearchContext {
    /**
     * The full query created using {@link Search.create},
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
    sort?: string
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
 * The metadata used for persistency between searches.
 */
export interface SearchMetadata {
    /**
     * The next page to search.
     */
    nextPage?: number
    /**
     * The last page to search.
     */
    maxPage?: number
    /**
     * Wether searches should stop.
     */
    shouldStop?: boolean
}

/**
 * The results of a search.
 */
export interface SearchResults {
    /**
     * The search metadata, used for persistency between searches.
     */
    metadata: SearchMetadata
    /**
     * The result of the search.
     * If this is undefined then the search has finished/ended correctly.
     */
    tiles?: MangaTile[]
    /**
     * The status code returned by the search request.
     */
    status?: number
    /**
     * Wether the current page should be skipped.
     */
    skip?: boolean
    /**
     * The reason given to the search result.
     */
    reason?: string
    /**
     * Wether the current search was by fallback.
     */
    fallback?: boolean
}

/**
 * Empty queries results in an error, so we get
 * around this error by searching for
 * something all books has when empty.
 * (In this case 'pages:>0')
 */
export const EmptySearch = Data.nhentai.empty_search

/**
 * The regex for matching book ids.\
 * The first ($1) group contains the id.
 */
export const BookRegex = Data.nhentai.book_regex

// The nhentai api is veery unstable when searching, and fails often
// so we scrape the site as a fallback when we get expected errors.
// As a last resort, the page will be outright skipped.
export const Search = {
    /**
     * Searches for books using provided context, objects & metadata with either the book id, API or fallback search.\
     * This method has extra capabilities. (E.g. page skipping, fallback) over the other search methods, and
     * is the preferred way to use {@link Search}.\
     * *This method first tries the book id then the API and if that fails tries the fallback search.*
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    search: async (ctx: SearchContext, objects: SearchObjects, metadata?: SearchMetadata): Promise<SearchResults> => {
        let page = metadata?.nextPage ?? 1
        // 3 pages. | page, page + 1, page + 2
        const softMax = page + 2

        if (metadata?.shouldStop || page > (metadata?.maxPage ?? page)) {
            return {
                metadata: {
                    shouldStop: true,
                },
                reason: 'Should stop. (Combined)',
            }
        }

        // Search by book id.
        if (ctx.bookId) {
            return Search.searchBookId(ctx, objects)
        }
        // Exit early if not a book id, but is parsed as such.
        if (new RegExp(BookRegex).test(ctx.text)) {
            throw new Error(`Search doesn't support text searches that matches book ids. (${ctx.text})`)
        }

        const alwaysFallback = objects.states != undefined && (await getAlwaysFallback(objects.states))
        if (alwaysFallback) {
            // This will be spammed, which is *fine* as this is only for debugging.
            console.log('[Warn] Always fallback is enabled.')
        }
        while (page <= (metadata?.maxPage ?? softMax)) {
            if (!alwaysFallback) {
                // Search by API
                const byApi = await Search.searchApi(ctx, objects, { ...metadata, nextPage: page }, true)
                if (!byApi.skip) {
                    return byApi
                }
            }

            if (objects.cheerio != undefined) {
                if (!alwaysFallback) {
                    console.log(`Unable to find page ${page} using api, trying fallback.`)
                }
                // Search by Fallback
                const byFallback = await Search.searchFallback(ctx, objects, { ...metadata, nextPage: page })
                if (!byFallback.skip) {
                    return byFallback
                }
                console.log(`Couldn't find page ${page}, skipping to the next.`)
            } else {
                if (alwaysFallback) {
                    throw new Error('Cheerio is required for always fallback.')
                }
                console.log(`Cheerio required for fallback is disabled, skipping page ${page}`)
            }
            page++
        }
        if (page > softMax) {
            // Should only happen if all endpoints returns 404,
            // else it would have thrown an error eariler.
            throw new Error('Search skipped 3 times, nhentai might be down.')
        }
        // Shouldn't ever reach here.
        return {
            metadata: {
                shouldStop: true,
            },
            reason: 'Skipped to end of pages. (Combined)',
        }
    },

    /**
     * Searches for books using provided context, objects & metadata with the API.\
     * *If {@link SearchMetadata.maxPage} is undefined, care should be taken for the next page.*
     * ***Prefer using {@link Search.search} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    searchApi: async (
        ctx: SearchContext,
        objects: SearchObjects,
        metadata?: SearchMetadata,
        canFallback?: boolean,
    ): Promise<SearchResults> => {
        if (ctx.bookId || new RegExp(BookRegex).test(ctx.text)) {
            throw new Error(`Search doesn't support text searches that matches book ids. (${ctx.text})`)
        }
        const page = metadata?.nextPage ?? 1

        if (metadata?.shouldStop || page > (metadata?.maxPage ?? page)) {
            return {
                metadata: {
                    shouldStop: true,
                },
                reason: 'Should stop.',
            }
        }
        const data = await Requests.search(objects.requests, ctx.text, page, ctx.sort)
        checkCloudflare(data.challenged)

        if (data.parsed != undefined) {
            const shouldStop = page + 1 > data.parsed.pages
            return {
                tiles: data.parsed.books.map((book) => BookParser.tile(book)),
                metadata: {
                    nextPage: page + 1,
                    maxPage: data.parsed.pages,
                    shouldStop,
                },
                status: data.status,
                reason: shouldStop ? 'End of pages.' : 'Search',
            }
        }
        // This can also just happen sometimes... for some reason. :D
        // Fallback search should be used in that case.
        // Search should skip if we shouldn't stop.
        if (data.status === 404) {
            const shouldStop = metadata?.maxPage != undefined ? page + 1 > metadata.maxPage : undefined
            const shouldSkip = !shouldStop || canFallback
            return {
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata?.maxPage,
                    shouldStop,
                },
                skip: shouldSkip,
                status: data.status,
                reason: shouldSkip ? 'Search skipped.' : 'Skipped to end of pages.',
            }
        }
        throw new Error(`Request Error ${data.status}: ${data.data}`)
    },

    /**
     * Searches for books using provided context, objects & metadata with the fallback search.\
     * *If {@link SearchMetadata.maxPage} is undefined, care should be taken for the next page.*
     * ***Prefer using {@link Search.search} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @param metadata The persistant search metadata.
     * @returns The search results.
     */
    searchFallback: async (
        ctx: SearchContext,
        objects: SearchObjects,
        metadata?: SearchMetadata,
    ): Promise<SearchResults> => {
        if (ctx.bookId || new RegExp(BookRegex).test(ctx.text)) {
            throw new Error(
                `Fallback doesn't support book id searches, as they usually respond with a book instead. (${ctx.text})`,
            )
        }
        if (objects.cheerio == undefined) {
            throw new Error('A Cheerio object is required for fallback.')
        }
        const page = metadata?.nextPage ?? 1
        const shouldStop = metadata?.maxPage != undefined ? page + 1 > metadata.maxPage : undefined

        if (metadata?.shouldStop || page > (metadata?.maxPage ?? page)) {
            return {
                metadata: {
                    shouldStop: true,
                },
                reason: 'Should stop. (Fallback)',
                fallback: true,
            }
        }
        // Using the normal Request Manager can easily
        // go over the rate limit, and should ideally
        // never be used for fallback.
        const data = await Requests.searchFallback(
            objects.fallback ?? objects.requests,
            objects.cheerio,
            ctx.text,
            page,
            ctx.sort,
        )
        checkCloudflare(data.challenged)

        if (data.parsed != undefined) {
            return {
                tiles: data.parsed.map((booklet) => BookParser.tileFallback(booklet)),
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata?.maxPage,
                    shouldStop,
                },
                status: data.status,
                reason: shouldStop ? 'End of pages. (Fallback)' : 'Search (Fallback)',
                fallback: true,
            }
        }
        // 429 happens when we reach the rate limit.
        // 404 doesn't ever actually happen? It's there just in case.
        // Search should skip if we shouldn't stop.
        if (data.status === 429 || data.status === 404) {
            return {
                metadata: {
                    nextPage: page + 1,
                    maxPage: metadata?.maxPage,
                    shouldStop,
                },
                skip: !shouldStop,
                status: data.status,
                reason: shouldStop ? 'Skipped to end of pages. (Fallback)' : 'Search skipped. (Fallback)',
                fallback: true,
            }
        }
        throw new Error(`Request Error (Fallback) ${data.status}: ${data.data}`)
    },

    /**
     * Searches for the book's identifier.\
     * ***Prefer using {@link Search.search} instead***
     * @param ctx The search context.
     * @param objects The search objects.
     * @returns The search results.
     */
    searchBookId: async (ctx: SearchContext, objects: SearchObjects): Promise<SearchResults> => {
        if (!ctx.bookId || !new RegExp(BookRegex).test(ctx.text)) {
            throw new Error(`Searching by book id, but '${ctx.text}' is invalid.`)
        }
        const data = await Requests.book(objects.requests, ctx.text)
        checkCloudflare(data.challenged)

        if (data.parsed != undefined) {
            return {
                tiles: [BookParser.tile(data.parsed)],
                metadata: {
                    shouldStop: true,
                },
                status: data.status,
                reason: 'Search by book id.',
            }
        }
        // nhentai search doesn't error for non-existant ids,
        // but instead returns 'no results', so we do the same.
        if (data.status === 404) {
            return {
                metadata: {
                    shouldStop: true,
                },
                status: data.status,
                reason: 'Book id not found.',
            }
        }
        throw new Error(`Request Error (BookId) ${data.status}: ${data.data}`)
    },

    /**
     * Creates a {@link SearchContext} from the provided parameters.
     * The context can be used in any of the search methods.
     * @param text The provided text.
     * @param options The provided options.
     * @returns The search context.
     */
    create: (text?: string, options?: SearchOptions): SearchContext => {
        const bookId = new RegExp(BookRegex).exec(text ?? '')
        if (bookId != null) {
            if (bookId[1] == undefined) {
                // To make typescript happy.
                throw new Error(`Shouldn't happen, but it did. Context: ${bookId} is, but also isn't a bookId???`)
            }
            return {
                text: bookId[1],
                bookId: true,
            }
        }
        const langs = Search.emitLanguages(options?.languages)
        const suffix = options?.suffix ?? ''
        const sort = SortDefs.findSource(options?.sort)

        const extras = `${langs} ${suffix}`.trim()
        const query = text != undefined ? `${text} ${extras}` : extras
        return {
            text: query.trim() || options?.empty || EmptySearch,
            sort,
        }
    },

    /**
     * Creates a {@link SearchContext} from the provided parameters & defaults
     * provided from the source's state maager. The context can be used in
     * any of the search methods.
     * @param states The source's state manager.
     * @param text The provided text.
     * @param options The provided options.
     * @returns The search context with defaults applied.
     */
    createWithSettings: async (
        states: SourceStateManager | undefined,
        text?: string,
        options?: SearchOptions,
    ): Promise<SearchContext> => {
        if (states == undefined) {
            return Search.create(text, options)
        }
        let langCtx = Search.createLanguageContext(options?.languages)
        if (langCtx.empty) {
            langCtx = Search.createLanguageContext(await getLanguage(states))
        }
        return Search.create(text, {
            suffix: options?.suffix ?? (await getSearchSuffix(states)),
            languages: langCtx,
            sort: options?.sort ?? (await getSorting(states)),
            empty: options?.empty,
        })
    },

    /**
     * Parses the languages property of the {@link SearchOptions} object
     * into a {@link LanguageContext}.
     * @param options The provided language options.
     * @returns The parsed language options, to a more strict object.
     */
    createLanguageContext: (options?: LanguageOptions): LanguageContext => {
        if (options == undefined) {
            return { include: [], exclude: [], empty: true }
        }
        if (typeof options === 'string') {
            const lang = LangDefs.findSource(options)
            return { include: asArray(lang), exclude: [], empty: lang == undefined }
        }
        if (Array.isArray(options)) {
            const filtered = LangDefs.getFilteredSources(options, true)
            return { include: filtered, exclude: [], empty: filtered.length <= 0 }
        }
        const include = LangDefs.getFilteredSources(asArray(options.include), true)
        const exclude = LangDefs.getFilteredSources(asArray(options.exclude), true, false)
        return {
            include,
            exclude: exclude.filter((excl) => !include.includes(excl)),
            empty: include.length <= 0 && exclude.length <= 0,
        }
    },

    /**
     * Uses {@link LangDefs.emit} to build a string containing both
     * include & exclude to be used in search.
     * @param options The provided language options.
     * @returns The emitted string, based on the provided options.
     */
    emitLanguages: (options?: LanguageOptions): string => {
        const langCtx = Search.createLanguageContext(options)
        const includedLangs = LangDefs.emit(langCtx.include, false)
        const excludedLangs = LangDefs.emit(langCtx.exclude, true)
        return `${includedLangs} ${excludedLangs}`.trim()
    },

    /**
     * Uses {@link LangDefs.emit} to build a string containing both
     * include & exclude to be used in search.
     * If the provided options are considered empty, use languages
     * provided by in-app settings instead.
     * @param options The provided language options.
     * @param states The source's state manager.
     * @returns The emitted string.
     */
    emitLanguagesWithSettings: async (options?: LanguageOptions, states?: SourceStateManager): Promise<string> => {
        let langCtx = Search.createLanguageContext(options)
        if (langCtx.empty && states != undefined) {
            langCtx = Search.createLanguageContext(await getLanguage(states))
        }
        return Search.emitLanguages(langCtx)
    },
}
