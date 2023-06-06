import { Data } from '../Data';
import { format } from '../Utils';

export const Urls = Data.nhentai.urls;

export interface Path {
  path: string;
  baseUrl: string;
}

const construct = (path: Path, replacements: Record<string, string>): string => {
  const url = (Urls as Record<string, string>)[path.baseUrl];
  if (url == undefined) {
    throw new Error(`Unable to construct path, unknown baseUrl '${path.baseUrl}'`);
  }
  return format(`${url}${path.path}`, replacements);
};

export const Paths = {
  /**
     * Search by query path.
     * @param query The search query.
     * @param page The page.
     * @param sort The sorting mode.
     * @returns The url.
     */
  search: (query: string, page: number | string = 1, sort?: string) =>
    construct(!sort ? Data.nhentai.paths.search : Data.nhentai.paths.searchSorted, {
      query: query,
      encoded_query: encodeURIComponent(query),
      page: page.toString(),
      sort: sort ?? '',
    }),

  /**
     * Search by query path. (fallback)
     * @param query The search query.
     * @param page The page.
     * @param sort The sorting mode.
     * @returns The url.
     */
  searchFallback: (query: string, page: number | string = 1, sort?: string) =>
    construct(!sort ? Data.nhentai.paths.searchFallback : Data.nhentai.paths.searchSortedFallback, {
      query: query,
      encoded_query: encodeURIComponent(query),
      page: page.toString(),
      sort: sort ?? '',
    }),

  /**
     * Gallery content path.
     * @param bookId The bookId.
     * @returns The url.
     */
  gallery: (bookId: number | string) =>
    construct(Data.nhentai.paths.gallery, {
      book_id: bookId.toString(),
    }),

  /**
     * Gallery's cover image path.
     * @param mediaId The mediaId. (This is different from bookId)
     * @param extension Image extension
     * @returns The url.
     */
  galleryCover: (mediaId: number | string, extension: string) =>
    construct(Data.nhentai.paths.galleryCover, {
      media_id: mediaId.toString(),
      extension: extension,
    }),

  /**
     * Gallery's page image path.
     * @param mediaId The mediaId. (This is different from bookId)
     * @param page The page.
     * @param extension The image extension.
     * @returns The url.
     */
  galleryPage: (mediaId: number | string, page: number | string, extension: string) =>
    construct(Data.nhentai.paths.galleryPage, {
      media_id: mediaId.toString(),
      page: page.toString(),
      extension: extension,
    }),
};
