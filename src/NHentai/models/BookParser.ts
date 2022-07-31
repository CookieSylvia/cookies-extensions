import {
    Chapter,
    ChapterDetails,
    Manga,
    MangaStatus,
    MangaTile, 
} from 'paperback-extensions-common'
import {
    Book,
    Booklet,
    BookTagType,
    Image, 
} from './BookTypes'
import { LangDefs } from './Languages'
import { Paths } from './Urls'

const getArtist = (book: Book): string => {
    for (const tag of book.tags) {
        if (tag.type === BookTagType.Artist) {
            return tag.name
        }
    }
    return 'Unknown'
}

// nhentai supports multiple languages.
// We prioritize the order defined in language definitions.
const getLanguages = (book: Book): string[] => {
    const languages: string[] = []
    for (const tag of book.tags) {
        if (tag.type === BookTagType.Language && tag.name !== 'translated') {
            languages.push(tag.name)
        }
    }
    return LangDefs.getFilteredSources(languages, true)
}

export const BookParser = {
    /**
     * Parses a {@link Book} into a {@link Manga} using {@link createManga}.
     * @param book The provided {@link Book}.
     * @returns The parsed manga.
     */
    manga: (book: Book): Manga => {
        const tags = book.tags
            .filter((tag) => tag.type === BookTagType.Tag)
            .map((tag) => createTag({ id: tag.id.toString(), label: tag.name }))

        const artist = getArtist(book)
        return createManga({
            id: book.bookId.toString(),
            titles: book.titles.priority,
            desc: `#${book.bookId}`,
            artist: artist,
            author: artist,
            image: Paths.galleryCover(book.mediaId, book.images.cover.type as string),
            status: MangaStatus.COMPLETED,
            follows: book.favorites,
            tags: [createTagSection({ id: 'tags', label: 'Tags', tags })],
            hentai: true,
        })
    },

    /**
     * Parses a {@link Book} into a {@link MangaTile} using {@link createMangaTile}.
     * @param book The provided {@link Book}.
     * @returns The parsed tile.
     */
    tile: (book: Book): MangaTile =>
        createMangaTile({
            id: book.bookId.toString(),
            image: Paths.galleryCover(book.mediaId, book.images.cover.type as string),
            subtitleText: createIconText({
                text: LangDefs.getSubtitle(getLanguages(book)),
            }),
            title: createIconText({
                text: book.titles.pretty,
            }),
        }),

    /**
     * Parses a {@link Booklet} into a {@link MangaTile} using {@link createMangaTile}.
     * @param booklet The provided {@link Booklet}.
     * @returns The parsed tile.
     */
    tileFallback: (booklet: Booklet): MangaTile =>
        createMangaTile({
            id: booklet.bookId,
            image: booklet.thumbnail,
            subtitleText: createIconText({
                text: booklet.languages.length > 0 ? `${LangDefs.getSubtitle(booklet.languages)}?` : 'Fallback',
            }),
            title: createIconText({
                text: booklet.title,
            }),
        }),

    /**
     * Parses a {@link Book} into a {@link Chapter} using {@link createChapter} with an optional {@link mangaId}.
     * @param book The provided {@link Book}.
     * @param mangaId The provided bookId.
     * @returns The parsed chapter.
     */
    chapter: (book: Book, mangaId?: string): Chapter =>
        createChapter({
            id: mangaId ?? book.bookId.toString(),
            mangaId: mangaId ?? book.bookId.toString(),
            chapNum: 1,
            name: book.titles.english,
            langCode: LangDefs.getPriorityLangCode(getLanguages(book)),
            time: new Date(book.uploaded),
        }),

    /**
     * Parses a {@link Book} into {@link ChapterDetails} using {@link createChapterDetails} with an optional {@link mangaId}.
     * @param book The provided {@link Book}.
     * @param mangaId  The provided bookId.
     * @returns The parsed chapter details.
     */
    chapterDetails: (book: Book, mangaId?: string): ChapterDetails =>
        createChapterDetails({
            id: mangaId ?? book.bookId.toString(),
            mangaId: mangaId ?? book.bookId.toString(),
            longStrip: false,
            pages: book.images.pages.map((image: Image, idx: number) =>
                Paths.galleryPage(book.mediaId, idx + 1, image.type as string),
            ),
        }),
}
