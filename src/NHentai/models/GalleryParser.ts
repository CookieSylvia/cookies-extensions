import { Book } from './Book'
import { Books } from './Books'
import { BookTitles } from './BookTitles'
import { Images } from './Images'
import { LangDefs } from './Language'
import { Tile } from './Tile'
import {
    BookTag,
    BookTagType, 
} from './BookTag'
import {
    Image,
    ImageType, 
} from './Image'
import {
    Galleries,
    Gallery,
    GalleryImage,
    GalleryImages,
    GalleryTag,
    GalleryTitles, 
} from './nhentai'

export interface GalleryParserModel {
    image: (image: GalleryImage) => Image
    images: (images: GalleryImages) => Images
    titles: (titles: GalleryTitles) => BookTitles
    tag: (tag: GalleryTag) => BookTag
    tiles: ($: CheerioStatic) => Tile[]
    book: (gallery: Gallery) => Book
    books: (galleries: Galleries) => Books
}

const getType = (type: 'j' | 'p' | 'g'): ImageType => {
    switch (type) {
        case 'j':
            return ImageType.JPG
        case 'p':
            return ImageType.PNG
        case 'g':
            return ImageType.GIF
    }
    throw new Error(`Unable to parse type '${type}'`)
}

export const GalleryParser: GalleryParserModel = {
    image: (image: GalleryImage): Image => {
        return {
            type: getType(image.t),
            width: image.w,
            height: image.h,
        }
    },

    images: (images: GalleryImages): Images => {
        return {
            cover: GalleryParser.image(images.cover),
            thumbnail: GalleryParser.image(images.thumbnail),
            pages: images.pages.map((page) => GalleryParser.image(page)),
        }
    },

    titles: (titles: GalleryTitles): BookTitles => {
        const priority = [titles.english, titles.japanese, titles.pretty].filter((title) => title != null) as string[]
        // tranformation:
        // - native? -> pretty? -> opposite? -> no title
        return {
            english: titles.english ?? titles.pretty ?? titles.japanese ?? '(no title)',
            japanese: titles.japanese ?? titles.pretty ?? titles.english ?? '(no title)',
            pretty: titles.pretty ?? titles.english ?? titles.japanese ?? '(no title)',
            priority: priority.length > 0 ? priority : ['(no title)'],
        }
    },

    tag: (tag: GalleryTag): BookTag => {
        return {
            id: tag.id,
            type: tag.type as BookTagType,
            name: tag.name,
            used: tag.count,
        }
    },

    tiles: ($: CheerioStatic): Tile[] => {
        const tiles: Tile[] = []
        $('.gallery').each((idx, self) => {
            const link = $(self).find('a').attr('href')
            const bookId = /(\d+)/.exec(link ?? '')?.[0]
            const title = $(self).find('.caption').text()
            const thumbnail = $(self).find('img').attr('data-src')

            if (bookId == undefined || title == undefined || thumbnail == undefined) {
                console.log(`Unable to cheerio tile ${idx}: ${$(self).html()}`)
                return
            }
            const tagIds = ($(self).attr('data-tags') ?? '').split(' ')
            tiles.push({
                bookId,
                title,
                thumbnail,
                languages: LangDefs.getSourcesFromTags(tagIds, true),
            })
        })
        return tiles
    },

    book: (gallery: Gallery): Book => {
        return {
            bookId: gallery.id,
            mediaId: gallery.media_id,
            titles: GalleryParser.titles(gallery.title),
            images: GalleryParser.images(gallery.images),
            scanlator: gallery.scanlator,
            tags: gallery.tags.map((tag) => GalleryParser.tag(tag)),
            uploaded: gallery.upload_date * 1000,
            pages: gallery.num_pages,
            favorites: gallery.num_favorites,
        }
    },

    books: (galleries: Galleries): Books => {
        return {
            books: galleries.result.map((gallery) => GalleryParser.book(gallery)),
            pages: galleries.num_pages,
            per_page: galleries.per_page,
        }
    },
}
