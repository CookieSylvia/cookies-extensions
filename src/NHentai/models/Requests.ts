import {
    RequestManager,
    Response, 
} from 'paperback-extensions-common'
import { Data } from '../Data'
import {
    Book,
    Booklet,
    Books, 
} from './BookTypes'
import { GalleryParser } from './GalleryParser'
import { Paths } from './Urls'

export const DefaultUserAgent = Data.nhentai.default_user_agent

/**
 * A response with the parsed result.
 */
export type Parsed<P> = {
    /**
     * The response which was provided from the server
     */
    data: string
    /**
     * The HTTP status code from the server response
     */
    status: number
    /**
     * Whether the `cf-mitigated: challenge` header was present.
     */
    challenged: boolean
    /**
     * The parsed object, if undefined then the request failed.
     */
    parsed?: P
}

const isStatusSuccess = (status: number) => status >= 200 && status <= 299
const isChallenged = (response: Response) => response.headers?.['cf-mitigated']?.toLowerCase() === 'challenge'

export const Requests = {
    /**
     * Sends a search request using all provided parameters.
     * Returns a response with {@link Books} if successful.
     * @param requests The {@link RequestManager}.
     * @param query The search query.
     * @param page The search page.
     * @param sort The search sort.
     * @returns A parsed response with {@link Books}.
     */
    search: async (
        requests: RequestManager,
        query: string,
        page?: number | string,
        sort?: string,
    ): Promise<Parsed<Books>> => {
        const request = createRequestObject({
            url: Paths.search(query, page, sort),
            method: 'GET',
        })
        // Destructing this doesn't seem to work correctly... for some reason.
        const response = await requests.schedule(request, 1)

        if (isStatusSuccess(response.status)) {
            return {
                data: response.data,
                status: response.status,
                challenged: isChallenged(response),
                parsed: GalleryParser.books(JSON.parse(response.data)),
            }
        }
        return {
            data: response.data,
            status: response.status,
            challenged: isChallenged(response),
        }
    },

    /**
     * Sends a fallback ssearch request using all provided parameters, parsing using cheerio.
     * Returns a response with {@link Books} if successful.
     * @param requests The (fallback) {@link RequestManager}.
     * @param cheerio The {@link CheerioAPI Cheerio API}.
     * @param query The search query.
     * @param page  The search page.
     * @param sort The search sort.
     * @returns A parsed response with {@link Books}.
     */
    searchFallback: async (
        requests: RequestManager,
        cheerio: CheerioAPI,
        query: string,
        page?: number | string,
        sort?: string,
    ): Promise<Parsed<Booklet[]>> => {
        const request = createRequestObject({
            url: Paths.searchFallback(query, page, sort),
            method: 'GET',
        })
        // Destructing this doesn't seem to work correctly... for some reason.
        const response = await requests.schedule(request, 1)

        if (isStatusSuccess(response.status)) {
            return {
                data: response.data,
                status: response.status,
                challenged: isChallenged(response),
                parsed: GalleryParser.booklets(cheerio.load(response.data)),
            }
        }
        return {
            data: response.data,
            status: response.status,
            challenged: isChallenged(response),
        }
    },

    /**
     * Sends a gallery request using all provided parameters.
     * Returns a response with a {@link Book} if successful.
     * @param requests The request manager.
     * @param bookId The bookId.
     * @returns A parsed response with a {@link Book}.
     */
    book: async (requests: RequestManager, bookId: number | string): Promise<Parsed<Book>> => {
        const request = createRequestObject({
            url: Paths.gallery(bookId),
            method: 'GET',
        })
        // Destructing this doesn't seem to work correctly... for some reason.
        const response = await requests.schedule(request, 1)

        if (isStatusSuccess(response.status)) {
            return {
                data: response.data,
                status: response.status,
                challenged: isChallenged(response),
                parsed: GalleryParser.book(JSON.parse(response.data)),
            }
        }
        return {
            data: response.data,
            status: response.status,
            challenged: isChallenged(response),
        }
    },
}
