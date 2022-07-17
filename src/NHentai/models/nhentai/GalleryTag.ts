export interface GalleryTag {
    id: number
    type: 'artist' | 'category' | 'character' | 'groups' | 'language' | 'parody' | 'tag'
    name: string
    url: string
    count: number
}
