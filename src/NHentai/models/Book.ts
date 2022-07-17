import { BookTag } from './BookTag'
import { BookTitles } from './BookTitles'
import { Images } from './Images'

export interface Book {
    /**
     * The number found at: /g/<bookId>
     */
    bookId: number
    /**
     * The id for requesting media (images)
     */
    mediaId: number
    /**
     * The book's titles
     */
    titles: BookTitles
    /**
     * The book's images
     */
    images: Images
    /**
     * The book's tags
     */
    tags: BookTag[]
    /**
     * The upload date, used with `new Date()`
     */
    uploaded: number
    /**
     * The amount of pages in this book
     */
    pages: number
    /**
     * The amount of times this book has been favorited
     */
    favorites: number
    /**
     * This property is currently always undefined
     */
    scanlator?: string
}
