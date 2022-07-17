export enum ImageType {
    JPG = 'jpg',
    PNG = 'png',
    GIF = 'gif',
}

export interface Image {
    /**
     * The image type
     */
    type: ImageType
    /**
     * The width of the image
     */
    width: number
    /**
     * The height of the image
     */
    height: number
}
