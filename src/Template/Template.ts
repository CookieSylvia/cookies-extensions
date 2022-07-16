import {
    Chapter,
    ChapterDetails,
    ContentRating,
    LanguageCode,
    Manga,
    MangaStatus,
    PagedResults,
    SearchRequest,
    Source,
    SourceInfo,
    SourceManga,
    TagType,
} from 'paperback-extensions-common'

export const TemplateInfo: SourceInfo = {
    version: '1.0.0',
    name: 'Template',
    icon: 'icon.png',
    author: 'ItemCookie',
    authorWebsite: 'https://github.com/ItemCookie',
    description: 'Template extension for reference.',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: 'https://itemcookie.net',
    language: LanguageCode.ENGLISH,
    sourceTags: [
        {
            text: 'Template',
            type: TagType.GREY,
        },
    ],
}

export class Template extends Source {
    readonly requestManager = createRequestManager({
        requestsPerSecond: 3,
        requestTimeout: 15000,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getMangaDetails(_mangaId: string): Promise<SourceManga | Manga> {
        return createSourceManga({
            id: 'template',
            mangaInfo: {
                titles: ['Template'],
                image: 'https://example.com/path_to_cover',
                status: MangaStatus.COMPLETED,
            },
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getChapters(mangaId: string): Promise<Chapter[]> {
        return [
            createChapter({
                id: 'c1',
                mangaId,
                chapNum: 1,
                langCode: LanguageCode.ENGLISH,
            }),
        ]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        return createChapterDetails({
            id: chapterId,
            mangaId,
            pages: ['https://example.com/path_to_page'],
            longStrip: false,
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    async getSearchResults(_query: SearchRequest, _metadata: any): Promise<PagedResults> {
        return createPagedResults({
            results: [createMangaTile({
                id: 'template',
                title: createIconText({
                    text: 'Template',
                }),
                image: 'https://example.com/path_to_thumbnail',
            })],
        })
    }
}
