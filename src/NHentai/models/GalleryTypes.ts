/**
 * A collection of galleries, with pageing information.
 */
export interface Galleries {
  /**
     * The resulting galleries.
     */
  result: Gallery[];
  /**
     * The amount of pages. (Related to search)
     */
  num_pages: number;
  /**
     * How mnay galleries per page. (Related to search)
     */
  per_page: number;
}

/**
 * The gallery.
 */
export interface Gallery {
  /**
     * The gallery's identifier. (Also known as BookId)\
     * The number found in: /g/:bookId
     */
  id: number;
  /**
     * The gallery's media identifier, used to request images.
     */
  media_id: number;
  /**
     * The gallery's titles.
     */
  title: GalleryTitles;
  /**
     * The gallery's images.
     */
  images: GalleryImages;
  /**
     * The scanlator of this gallery.
     * (Currently, and probably always will be, an empty string)
     */
  scanlator: string | undefined;
  /**
     * The gallery's upload date. (Seconds since Unix Epoch)
     */
  upload_date: number;
  /**
     * The gallery's tags.
     */
  tags: GalleryTag[];
  /**
     * The amount of pages this gallery has.\
     * Actual pages are found in {@link GalleryImages.pages}.
     */
  num_pages: number;
  /**
     * The amount of favorites this gallery has.
     */
  num_favorites: number;
}

/**
 * All images in the gallery.
 */
export interface GalleryImages {
  /**
     * The (normal quality) cover image.
     */
  cover: GalleryImage;
  /**
     * The (lower quality) thumbnail image.
     */
  thumbnail: GalleryImage;
  /**
     * The images of the gallery's pages.
     */
  pages: GalleryImage[];
}

/**
 * An image used in a gallery.
 */
export interface GalleryImage {
  /**
     * The image's format.\
     * [j]pg, [p]ng, [g]if
     */
  t: 'j' | 'p' | 'g';
  /**
     * The image's width.
     */
  w: number;
  /**
     * The image's height.
     */
  h: number;
}

/**
 * A tag used in a galley.
 */
export interface GalleryTag {
  /**
     * The tag's identifier.
     */
  id: number;
  /**
     * The tag's type.
     */
  type: 'artist' | 'category' | 'character' | 'groups' | 'language' | 'parody' | 'tag';
  /**
     * The user-friendly name of the tag.
     */
  name: string;
  /**
     * The path to search by the tag.\
     * E.g. (type: tag, name: twintails) = '/tag/twintails/'
     */
  url: string;
  /**
     * The amount of galleries using this tag.
     */
  count: number;
}

/**
 * The object containing all the gallery's titles.
 */
export interface GalleryTitles {
  /**
     * The english title.
     */
  english?: string | null;
  /**
     * The japanese title.
     */
  japanese?: string | null;
  /**
     * The pretty title.
     */
  pretty?: string | null;
}
