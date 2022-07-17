/**
 * Type\
 * 'j' is for jpg\
 * 'p' is for png\
 * 'g' is for gif
 */
export interface GalleryImage {
    t: 'j' | 'p' | 'g'
    /**
     * Width
     */
    w: number
    /**
     * Height
     */
    h: number
}
