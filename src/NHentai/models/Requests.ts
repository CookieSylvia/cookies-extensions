import {
  Request,
  RequestManager,
  Response, 
} from '@paperback/types';
import {
  Book,
  Booklet,
  Books, 
} from './BookTypes';
import { Paths } from './Urls';
import { GalleryParser } from './GalleryParser';

/**
 * A response with the parsed result.
 */
export type Parsed<P> = {
  /**
     * The response which was provided from the server
     */
  data?: string;
  /**
     * The HTTP status code from the server response
     */
  status: number;
  /**
     * Whether the `cf-mitigated: challenge` header was present.
     */
  cfChallenge: boolean;
  /**
     * The parsed object, if undefined then the request failed.
     */
  parsed?: P;
}

const isStatusSuccess = (status: number) => status >= 200 && status <= 299;
const isChallenged = (response: Response) => response.headers?.['cf-mitigated']?.toLowerCase() === 'challenge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const acceptJson = <R>(parser: (input: any) => Promise<R | undefined> | R | undefined): ((input: string) => Promise<R | undefined>) => {
  return async (str: string): Promise<R | undefined> => {
    return await parser(JSON.parse(str));
  };
};

const acceptCheerio = <R>(cheerio: CheerioAPI, parser: (input: CheerioStatic) => Promise<R | undefined> | R | undefined): ((input: string) => Promise<R | undefined>) => {
  return async (str: string): Promise<R | undefined> => {
    return await parser(cheerio.load(str));
  };
};

const getParsed = async <R>(requests: RequestManager, request: Request, parser: (input: string) => Promise<R | undefined> | R | undefined): Promise<Parsed<R>> => {
  // Destructing this doesn't seem to work correctly... for some reason.
  const response = await requests.schedule(request, 1);

  if (response.data && isStatusSuccess(response.status)) {
    return {
      data: response.data,
      status: response.status,
      cfChallenge: isChallenged(response),
      parsed: await parser(response.data),
    };
  }
  return {
    data: response.data,
    status: response.status,
    cfChallenge: isChallenged(response),
  };
};

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
    const request = App.createRequest({
      url: Paths.search(query, page, sort),
      method: 'GET',
    });
    return await getParsed(requests, request, acceptJson(GalleryParser.books));
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
    const request = App.createRequest({
      url: Paths.searchFallback(query, page, sort),
      method: 'GET',
    });
    return await getParsed(requests, request, acceptCheerio(cheerio, GalleryParser.booklets));
  },

  /**
   * Sends a gallery request using all provided parameters.
   * Returns a response with a {@link Book} if successful.
   * @param requests The request manager.
   * @param bookId The bookId.
   * @returns A parsed response with a {@link Book}.
   */
  book: async (requests: RequestManager, bookId: number | string): Promise<Parsed<Book>> => {
    const request = App.createRequest({
      url: Paths.gallery(bookId),
      method: 'GET',
    });
    return await getParsed(requests, request, acceptJson(GalleryParser.book));
  },
};
