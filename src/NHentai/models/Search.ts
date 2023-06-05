import {
  RequestManager,
  SourceStateManager, 
} from '@paperback/types';
import { Data } from '../Data';

/**
 * The objects used for searching.
 */
export interface SearchObjects {
  /**
   * The usual request manager for API requests.
   */
  requests: RequestManager;
  /**
   * The state manager for source settings.
   */
  states?: SourceStateManager;
  /**
   * The Cheerio API for scraping fallback requests for
   * useful data. (Required for fallback)
   */
  cheerio?: CheerioAPI;
  /**
   * The request manager to use for fallback requests.
   * The usual request manager will be used if this is not set.
   */
  fallback?: RequestManager;
}

/**
 * The metadata used for persistency between searches.
 */
export interface SearchMetadata {
  /**
   * The next page to search.
   */
  nextPage?: number;
  /**
   * The last page to search.
   */
  maxPage?: number;
  /**
   * Wether searches should stop.
   */
  shouldStop?: boolean;
}


/**
 * Empty queries results in an error, so we get
 * around this error by searching for
 * something all books has when empty.
 * (In this case 'pages:>0')
 */
export const EmptySearch = Data.nhentai.emptySearch;

/**
 * The regex for matching book ids.
 * The first ($1) group contains the id.
 */
export const BookRegex = Data.nhentai.bookRegex;
