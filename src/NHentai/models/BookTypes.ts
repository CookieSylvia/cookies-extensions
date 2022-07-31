/**
 * A collection of books, including page info.
 */
export interface Books {
    /**
     * The contained books.
     */
    books: Book[]
    /**
     * The amount of pages in total. (Related to search)
     */
    pages: number
    /**
     * The amount of books per page. (Related to search)
     */
    perPage: number
}

/**
 * The almighty book!
 */
export interface Book {
    /**
     * The book's identifier.\
     * The number found in: /g/:bookId
     */
    bookId: number
    /**
     * The id for requesting media. (images)
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
     * The book's upload date. (Milliseconds since Unix Epoch)
     */
    uploaded: number
    /**
     * The amount of pages in this book.\
     * Actual pages are found in {@link Images.pages}
     */
    pages: number
    /**
     * The amount of times this book has been favorited.
     */
    favorites: number
    /**
     * The book's scanlator.\
     * (Currently, and probably always will be, an empty string)
     */
    scanlator?: string
}

/**
 * A minimal {@link Book}, contaning only the most useful info.
 * Used by fallback searches.
 */
export interface Booklet {
    bookId: string
    title: string
    thumbnail: string
    languages: string[]
}

/**
 * A collection of pages, cover & thumbnail
 */
export interface Images {
    /**
     * The (normal quality) cover image.
     */
    cover: Image
    /**
     * The (lower quality) thumbnail image.
     */
    thumbnail: Image
    /**
     * The pages of a book.
     */
    pages: Image[]
}

export enum ImageType {
    JPG = 'jpg',
    PNG = 'png',
    GIF = 'gif',
}

/**
 * An image used by books.
 */
export interface Image {
    /**
     * The image's type.
     */
    type: ImageType
    /**
     * The image's width.
     */
    width: number
    /**
     * The image's height.
     */
    height: number
}

export enum BookTagType {
    Artist = 'artist',
    Category = 'category',
    Character = 'character',
    Groups = 'groups',
    Language = 'language',
    Parody = 'parody',
    Tag = 'tag',
}

/**
 * A tag used by books.
 */
export interface BookTag {
    /**
     * The tag's identifier.
     */
    id: number
    /**
     * The tag's type.
     */
    type: BookTagType
    /**
     * The user-friendly name of the tag.
     */
    name: string
    /**
     * The amount of books the tag is used in.
     */
    used: number
}

/**
 * The titles of book in different languages.
 */
export interface BookTitles {
    /**
     * The english title of a book. This might be one of the other titles if missing\
     * (priority: english -> pretty -> japanese -> '(no title)')
     */
    english: string
    /**
     * The japanese title of a book. This might be one of the other titles if missing\
     * (priority: japanese -> pretty -> english -> '(no title)')
     */
    japanese: string
    /**
     * A short (pretty) title of a book. This might be one of the other titles if missing\
     * (priority: pretty -> english -> japanese -> '(no title)')
     */
    pretty: string
    /**
     * An array representing all non-missing titles in priority\
     * (priority: english -> japanese -> pretty) or if empty, ['(no title)']
     */
    priority: string[]
}
