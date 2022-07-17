import { GalleryImages } from './GalleryImages'
import { GalleryTag } from './GalleryTag'
import { GalleryTitles } from './GalleryTitles'

export interface Gallery {
    id: number
    media_id: number
    title: GalleryTitles
    images: GalleryImages
    scanlator: string | undefined
    upload_date: number
    tags: GalleryTag[]
    num_pages: number
    num_favorites: number
}
