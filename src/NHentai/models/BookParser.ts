import {
  Chapter,
  ChapterDetails,
  PartialSourceManga,
  SourceManga, 
} from '@paperback/types';
import {
  Book,
  BookTagType,
  Booklet,
  Image, 
} from './BookTypes';
import { LangDefs } from './Languages';
import { Paths } from './Urls';

const getArtist = (book: Book): string => {
  for (const tag of book.tags) {
    if (tag.type === BookTagType.Artist) {
      return tag.name;
    }
  }
  return 'Unknown';
};

const getLanguages = (book: Book): string[] => {
  const languages: string[] = [];
  for (const tag of book.tags) {
    if (tag.type === BookTagType.Language && tag.name !== 'translated') {
      languages.push(tag.name);
    }
  }
  return LangDefs.getFilteredSources(languages, true);
};

export const BookParser = {
  /**
   * Parses a {@link Book} into a {@link Manga} using {@link createManga}.
   * @param book The provided {@link Book}.
   * @returns The parsed manga.
   */
  manga: (book: Book): SourceManga => {
    const tags = book.tags
      .filter((tag) => tag.type === BookTagType.Tag)
      .map((tag) => App.createTag({ id: tag.id.toString(), label: tag.name }));

    const artist = getArtist(book);
    return App.createSourceManga({
      id: book.bookId.toString(),
      mangaInfo: App.createMangaInfo({
        image: Paths.galleryCover(book.mediaId, book.images.cover.type as string),
        artist: artist,
        author: artist,
        desc: `#${book.bookId}\nPages: ${book.pages}\nFavorites: ${book.favorites}`,
        status: 'Completed',
        hentai: true,
        titles: book.titles.priority,
        tags: [App.createTagSection({ id: 'tags', label: 'Tags', tags })],
      }),
    });
  },

  /**
     * Parses a {@link Book} into a {@link PartialSourceManga} using {@link App.createPartialSourceManga}.
     * @param book The provided {@link Book}.
     * @returns The parsed partial manga.
     */
  partial: (book: Book): PartialSourceManga =>
    App.createPartialSourceManga({
      mangaId: book.bookId.toString(),
      image: Paths.galleryCover(book.mediaId, book.images.cover.type as string),
      title: book.titles.pretty,
      subtitle: LangDefs.getSubtitle(getLanguages(book), true),
    }),

  /**
     * Parses a {@link Booklet} into a {@link PartialSourceManga} using {@link App.createPartialSourceManga}.
     * @param booklet The provided {@link Booklet}.
     * @returns The parsed partial manga.
     */
  partialFallback: (booklet: Booklet): PartialSourceManga =>
    App.createPartialSourceManga({
      mangaId: booklet.bookId,
      image: booklet.thumbnail,
      title: booklet.title,
      subtitle: booklet.languages.length > 0 ? `${LangDefs.getSubtitle(booklet.languages, true)}?` : 'Fallback',
    }),

  /**
     * Parses a {@link Book} into a {@link Chapter} using {@link createChapter} with an optional {@link mangaId}.
     * @param book The provided {@link Book}.
     * @param mangaId The provided bookId.
     * @returns The parsed chapter.
     */
  chapter: (book: Book, mangaId?: string): Chapter =>
    App.createChapter({
      id: mangaId ?? book.bookId.toString(),
      chapNum: 1,
      name: book.titles.english,
      langCode: LangDefs.getSubtitle(getLanguages(book), true, true),
      time: new Date(book.uploaded),
    }),

  /**
     * Parses a {@link Book} into {@link ChapterDetails} using {@link createChapterDetails} with an optional {@link mangaId}.
     * @param book The provided {@link Book}.
     * @param mangaId  The provided bookId.
     * @returns The parsed chapter details.
     */
  chapterDetails: (book: Book, mangaId?: string): ChapterDetails =>
    App.createChapterDetails({
      id: mangaId ?? book.bookId.toString(),
      mangaId: mangaId ?? book.bookId.toString(),
      pages: book.images.pages.map((image: Image, idx: number) =>
        Paths.galleryPage(book.mediaId, idx + 1, image.type as string),
      ),
    }),
};
