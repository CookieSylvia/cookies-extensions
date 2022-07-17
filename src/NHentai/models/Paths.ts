import { Data } from '../SourceData'
import { format } from '../Utils'

export interface Path {
    path: string
    url: string
}

export interface PathsModel {
    /**
     * Search by query endpoint
     * @param query Search query
     * @param page Page
     * @param sort Sorting mode
     * @returns The url endpoint
     */
    search: (query: string, page?: number | string, sort?: string) => string
    /**
     * Search by query endpoint (fallback)
     * @param query Search query
     * @param page Page
     * @param sort Sorting mode
     * @returns The url endpoint
     */
    searchFallback: (query: string, page?: number | string, sort?: string) => string
    /**
     * Gallery content endpoint.
     * @param bookId Book id
     * @returns The url endpoint.
     */
    gallery: (bookId: number | string) => string
    /**
     * Gallery's cover image endpoint.
     * @param mediaId Media id (This is different from Book id)
     * @param extension Image extension
     * @returns The url endpoint.
     */
    galleryCover: (mediaId: number | string, extension: string) => string
    /**
     * Gallery's page image endpoint.
     * @param mediaId Media id (This is different from Book id)
     * @param page Page
     * @param extension Image extension
     * @returns The url endpoint.
     */
    galleryPage: (mediaId: number | string, page: number | string, extension: string) => string
    /**
     * Gallery's page's thumbnail image endpoint.
     * @param mediaId Media id (This is different from Book id)
     * @param page Page
     * @param extension Image extension
     * @returns The url endpoint.
     */
    galleryPageThumbnail: (mediaId: number | string, page: number | string, extension: string) => string
}

const construct = (path: Path, replacements: Record<string, string>): string => {
    const url = (Data.nhentai.urls as Record<string, string>)[path.url]
    if (url == undefined) {
        throw new Error(`Unable to construct path, unknown host '${path.url}'`)
    }
    return format(`${url}${path.path}`, replacements)
}

export const Paths: PathsModel = {
    search: (query: string, page: string | number = 1, sort?: string | undefined) =>
        construct(sort == undefined ? Data.nhentai.paths.search : Data.nhentai.paths.searchSorted, {
            query: query,
            encoded_query: encodeURIComponent(query),
            page: page.toString(),
            sort: sort ?? '',
        }),

    searchFallback: (query: string, page: string | number = 1, sort?: string | undefined) =>
        construct(sort == undefined ? Data.nhentai.paths.searchFallback : Data.nhentai.paths.searchSortedFallback, {
            query: query,
            encoded_query: encodeURIComponent(query),
            page: page.toString(),
            sort: sort ?? '',
        }),

    gallery: (bookId: string | number) =>
        construct(Data.nhentai.paths.gallery, {
            bookId: bookId.toString(),
        }),

    galleryCover: (mediaId: string | number, extension: string) =>
        construct(Data.nhentai.paths.galleryCover, {
            mediaId: mediaId.toString(),
            extension: extension,
        }),

    galleryPage: (mediaId: string | number, page: string | number, extension: string) =>
        construct(Data.nhentai.paths.galleryPage, {
            mediaId: mediaId.toString(),
            page: page.toString(),
            extension: extension,
        }),

    galleryPageThumbnail: (mediaId: string | number, page: string | number, extension: string) =>
        construct(Data.nhentai.paths.galleryPageThumbnail, {
            mediaId: mediaId.toString(),
            page: page.toString(),
            extension: extension,
        }),
}
