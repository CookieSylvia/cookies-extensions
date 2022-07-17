import {
    Chapter,
    ChapterDetails,
    Manga,
    MangaStatus,
    MangaTile, 
} from 'paperback-extensions-common'
import { Book } from './Book'
import { Books } from './Books'
import { BookTagType } from './BookTag'
import { Image } from './Image'
import { LangDefs } from './Language'
import { Paths } from './Paths'
import { Tile } from './Tile'

export interface BookParserModel {
    manga: (book: Book) => Manga
    tiles: (books: Books) => MangaTile[]
    tile: (book: Book) => MangaTile
    tileFallback: (tile: Tile) => MangaTile
    chapter: (book: Book, mangaId: string) => Chapter
    chapterDetails: (book: Book, mangaId: string) => ChapterDetails
}

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
const getLanguage = (book: Book): string => {
    const languages: string[] = []
    for (const tag of book.tags) {
        if (tag.type === BookTagType.Language && tag.name !== 'translated') {
            languages.push(tag.name)
        }
    }
    return LangDefs.getSourceCodes(true).find((source) => languages.includes(source)) ?? ''
}

export const BookParser: BookParserModel = {
    manga: (book: Book): Manga => {
        const tags = book.tags
            .filter((tag) => tag.type === BookTagType.Tag)
            .map((tag) => createTag({ id: tag.id.toString(), label: tag.name }))

        const artist = getArtist(book)
        return createManga({
            id: book.bookId.toString(),
            titles: book.titles.priority,
            artist: artist,
            author: artist,
            image: Paths.galleryCover(book.mediaId, book.images.cover.type as string),
            status: MangaStatus.COMPLETED,
            follows: book.favorites,
            tags: [createTagSection({ id: 'tags', label: 'Tags', tags })],
            hentai: true,
        })
    },

    tiles: (books: Books) => books.books.map((book) => BookParser.tile(book)),

    tile: (book: Book) =>
        createMangaTile({
            id: book.bookId.toString(),
            image: Paths.galleryCover(book.mediaId, book.images.cover.type as string),
            subtitleText: createIconText({
                text: LangDefs.getName(getLanguage(book)),
            }),
            title: createIconText({
                text: book.titles.pretty,
            }),
        }),

    tileFallback: (tile: Tile) =>
        createMangaTile({
            id: tile.bookId,
            image: tile.thumbnail,
            subtitleText: createIconText({
                text: tile.language != undefined ? `${LangDefs.getName(tile.language)}?` : 'Fallback',
            }),
            title: createIconText({
                text: tile.title,
            }),
        }),

    chapter: (book: Book, mangaId: string) =>
        createChapter({
            id: mangaId,
            mangaId: mangaId,
            chapNum: 1,
            name: book.titles.english,
            langCode: LangDefs.getInternalCode(getLanguage(book)),
            time: new Date(book.uploaded),
        }),

    chapterDetails: (book: Book, mangaId: string) =>
        createChapterDetails({
            id: mangaId,
            mangaId: mangaId,
            longStrip: false,
            pages: book.images.pages.map((image: Image, idx: number) =>
                Paths.galleryPage(book.mediaId, idx + 1, image.type as string),
            ),
        }),
}
