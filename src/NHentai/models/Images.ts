import { Image } from './Image'

/**
 * A collection of pages, cover & thumbnail
 */
export interface Images {
    pages: Image[]
    cover: Image
    thumbnail: Image
}
