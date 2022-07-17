import {
    RequestManager,
    Response, 
} from 'paperback-extensions-common'
import { Book } from './Book'
import { Books } from './Books'
import { GalleryParser } from './GalleryParser'
import { Parsed } from './Parsed'
import { Paths } from './Paths'
import { Tile } from './Tile'

export interface RequestsModel {
    search: (
        requests: RequestManager,
        query: string,
        page?: number | string,
        sort?: string,
    ) => Promise<Parsed<Response, Books>>
    searchFallback: (
        requests: RequestManager,
        cheerio: CheerioAPI,
        query: string,
        page?: number | string,
        sort?: string,
    ) => Promise<Parsed<Response, Tile[]>>
    book: (requests: RequestManager, bookId: number | string) => Promise<Parsed<Response, Book>>
}

const isStatusSuccess = (status: number) => status <= 299 && status >= 200

export const Requests: RequestsModel = {
    search: async (
        requests: RequestManager,
        query: string,
        page?: number | string,
        sort?: string,
    ): Promise<Parsed<Response, Books>> => {
        const request = createRequestObject({
            url: Paths.search(query, page, sort),
            method: 'GET',
        })
        const response = await requests.schedule(request, 1)

        if (isStatusSuccess(response.status)) {
            return {
                ...response,
                parsed: GalleryParser.books(JSON.parse(response.data)),
            }
        }
        return response
    },

    searchFallback: async (
        requests: RequestManager,
        cheerio: CheerioAPI,
        query: string,
        page?: number | string,
        sort?: string,
    ): Promise<Parsed<Response, Tile[]>> => {
        const request = createRequestObject({
            url: Paths.searchFallback(query, page, sort),
            method: 'GET',
        })
        const response = await requests.schedule(request, 1)

        if (isStatusSuccess(response.status)) {
            return {
                ...response,
                parsed: GalleryParser.tiles(cheerio.load(response.data)),
            }
        }
        return response
    },

    book: async (requests: RequestManager, bookId: number | string): Promise<Parsed<Response, Book>> => {
        const request = createRequestObject({
            url: Paths.gallery(bookId),
            method: 'GET',
        })
        const response = await requests.schedule(request, 1)

        if (isStatusSuccess(response.status)) {
            return {
                ...response,
                parsed: GalleryParser.book(JSON.parse(response.data)),
            }
        }
        return response
    },
}
