import { Book } from './Book'

/**
 * A collection of books, including page info
 */
export interface Books {
    books: Book[]
    /**
     * The amount of pages in total
     */
    pages: number
    /**
     * The amount of books per page
     */
    per_page: number
}
