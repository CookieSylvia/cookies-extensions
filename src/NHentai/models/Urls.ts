import { Data } from '../SourceData'

export interface UrlsModel {
    api: string
    thumbnails: string
    images: string
    cloudflare: string
}

export const Urls: UrlsModel = Data.nhentai.urls
