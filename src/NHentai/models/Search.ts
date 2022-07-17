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
import {
    checkCloudflare,
    dumbify, 
} from '../Utils'
import { BookParser } from './BookParser'
import { Requests } from './Requests'

export interface CreateSearch {
    suffix?: string
    language?: string
    sorting?: string
}

export interface SearchContext {
    text: string
    bookId?: boolean
    sorting?: string
}

export interface SearchOptions {
    requests: RequestManager
    states?: SourceStateManager
    cheerio?: CheerioAPI
    fallback?: RequestManager
}

export interface SearchMetadata {
    nextPage?: number
    maxPage?: number
    shouldStop?: boolean
}

export interface SearchResults {
    metadata: SearchMetadata
    data: string
    tiles?: MangaTile[]
}

export interface SearchModel {
    search: (ctx: SearchContext, options: SearchOptions, metadata?: SearchMetadata) => Promise<SearchResults>
    create: (text?: string, options?: CreateSearch) => SearchContext
    createWithSettings: (states: SourceStateManager, text?: string, options?: CreateSearch) => Promise<SearchContext>
}

// The nhentai api is veery unstable when searching, and fails often
// so we scrape the site as a fallback when we get expected errors.
// As a last resort, the page will be outright skipped.
export const Search: SearchModel = {
    search: async (ctx: SearchContext, options: SearchOptions, metadata?: SearchMetadata): Promise<SearchResults> => {
        let nextPage = metadata?.nextPage ?? 1
        const maxPage = metadata?.maxPage ?? nextPage
        const shouldStop = metadata?.shouldStop ?? nextPage > maxPage

        if (shouldStop) {
            return {
                data: 'Was asked to stop',
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
            // fallthrough - It might not actually be a bookId?
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

    create: (text?: string, options?: CreateSearch): SearchContext => {
        if (text != undefined && /^\d+$/.test(text)) {
            return {
                text: text,
                bookId: true,
            }
        }
        const lang = options?.language ?? '_'
        const end = options?.suffix ?? ''
        const suffix = `${!lang.startsWith('_') ? `language:${lang}` : ''} ${end}`.trim()
        return {
            text: dumbify(text != undefined ? `${text} ${suffix}` : suffix),
            sorting: options?.sorting,
        }
    },

    createWithSettings: async (
        states: SourceStateManager,
        text?: string,
        options?: CreateSearch,
    ): Promise<SearchContext> => {
        return Search.create(text, {
            suffix: options?.suffix ?? (await getSearchSuffix(states)),
            language: options?.language ?? (await getLanguage(states)),
            sorting: options?.sorting ?? (await getSorting(states)),
        })
    },
}
