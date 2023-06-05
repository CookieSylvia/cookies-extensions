import {
  Book,
  BookTag,
  BookTagType,
  BookTitles,
  Booklet,
  Books,
  Image,
  ImageType,
  Images, 
} from './BookTypes';
import {
  Galleries,
  Gallery,
  GalleryImage,
  GalleryImages,
  GalleryTag,
  GalleryTitles, 
} from './GalleryTypes';
import { LangDefs } from './Languages';

const getType = (type: 'j' | 'p' | 'g'): ImageType => {
  switch (type) {
    case 'j':
      return ImageType.JPG;
    case 'p':
      return ImageType.PNG;
    case 'g':
      return ImageType.GIF;
  }
  // Unreachable, but is there just in case.
  throw new Error(`Unable to parse image type '${type}'`);
};

export const GalleryParser = {
  /**
     * Parses a {@link GalleryImage} into a {@link Image}.
     * @param image The provided {@link GalleryImage}.
     * @returns The parsed image.
     */
  image: (image: GalleryImage): Image => {
    return {
      type: getType(image.t),
      width: image.w,
      height: image.h,
    };
  },

  /**
     * Parses {@link GalleryImages} into {@link Images}.
     * @param images The provided {@link GalleryImages}.
     * @returns The parsed images.
     */
  images: (images: GalleryImages): Images => {
    return {
      cover: GalleryParser.image(images.cover),
      thumbnail: GalleryParser.image(images.thumbnail),
      pages: images.pages.map((page) => GalleryParser.image(page)),
    };
  },

  /**
     * Parses {@link GalleryTitles} into {@link BookTitles}.
     * @param titles The provided {@link GalleryTitles}.
     * @returns The parsed titles.
     */
  titles: (titles: GalleryTitles): BookTitles => {
    const priority = [titles.english, titles.japanese, titles.pretty].filter((title) => title != null) as string[];
    // tranformation:
    // - native? -> pretty? -> opposite? -> no title
    return {
      english: titles.english ?? titles.pretty ?? titles.japanese ?? '(no title)',
      japanese: titles.japanese ?? titles.pretty ?? titles.english ?? '(no title)',
      pretty: titles.pretty ?? titles.english ?? titles.japanese ?? '(no title)',
      priority: priority.length > 0 ? priority : ['(no title)'],
    };
  },

  /**
     * Parses a {@link GalleryTag} into a {@link BookTag}
     * @param tag The provided {@link GalleryTag}.
     * @returns The parsed tag.
     */
  tag: (tag: GalleryTag): BookTag => {
    return {
      id: tag.id,
      type: tag.type as BookTagType,
      name: tag.name,
      used: tag.count,
    };
  },

  /**
   * Parses the loaded data into {@link Booklet Booklets}.
   * @param $ The loaded cheerio instance.
   * @returns The parsed booklets.
   */
  booklets: ($: CheerioStatic): Booklet[] => {
    const booklets: Booklet[] = [];
    $('.gallery').each((idx, self) => {
      // $ a[href]
      const link = $(self).find('a').attr('href');
      const bookId = /(\d+)/.exec(link ?? '')?.[0];
      // $ .caption
      const title = $(self).find('.caption').text();
      // $ img[data-src]
      const thumbnail = $(self).find('img').attr('data-src');

      if (bookId == undefined || title == undefined || thumbnail == undefined) {
        console.log(`Unable to cheerio booklet ${idx}: ${$(self).html()}`);
        return;
      }
      // $ [data-tags]
      const tagIds = ($(self).attr('data-tags') ?? '').split(' ');
      booklets.push({
        bookId,
        title,
        thumbnail,
        languages: LangDefs.getSourcesFromTags(tagIds, true),
      });
    });
    return booklets;
  },

  /**
   * Parses a {@link Gallery} into a {@link Book}.
   * @param gallery The provided {@link Gallery}.
   * @returns The parsed book.
   */
  book: (gallery: Gallery): Book => {
    return {
      bookId: gallery.id,
      mediaId: gallery.media_id,
      titles: GalleryParser.titles(gallery.title),
      images: GalleryParser.images(gallery.images),
      scanlator: gallery.scanlator,
      tags: gallery.tags.map((tag) => GalleryParser.tag(tag)),
      // Tranform seconds into milliseconds.
      uploaded: gallery.upload_date * 1000,
      pages: gallery.num_pages,
      favorites: gallery.num_favorites,
    };
  },

  /**
   * Parses {@link Galleries} into {@link Books}.
   * @param galleries The provided {@link Galleries}.
   * @returns The parsed books.
   */
  books: (galleries: Galleries): Books => {
    return {
      books: galleries.result.map((gallery) => GalleryParser.book(gallery)),
      pages: galleries.num_pages,
      perPage: galleries.per_page,
    };
  },
};
