export interface BookTitles {
    /**
     * The english title of a book, this might be one of the others if missing\
     * (priority: english -> pretty -> japanese -> '(no title)')
     */
    english: string
    /**
     * The japanese title of a book, this might be one of the others if missing\
     * (priority: japanese -> pretty -> english -> '(no title)')
     */
    japanese: string
    /**
     * A short (pretty) title of a book, this might be one of the others if missing\
     * (priority: pretty -> english -> japanese -> '(no title)')
     */
    pretty: string
    /**
     * An array representing all non-missing titles in priority\
     * (priority: english -> japanese -> pretty) or if empty, ['(no title)']
     */
    priority: string[]
}
