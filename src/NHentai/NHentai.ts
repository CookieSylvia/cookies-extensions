import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    LanguageCode,
    Manga,
    PagedResults,
    Request,
    RequestInterceptor,
    Response,
    SearchRequest,
    Section,
    Source,
    SourceInfo,
    SourceManga,
    Tag,
    TagSection,
    TagType,
} from 'paperback-extensions-common'
import {
    BookParser,
    LangDefs,
    Parsed,
    Requests,
    Search,
    SearchMetadata,
    SearchOptions,
    SortDefs,
    Urls,
    UserAgent,
} from './models'
import {
    debugView,
    getIncognito,
    resetSettings,
    settings, 
} from './Settings'
import { checkCloudflare } from './Utils'

export const NHentaiInfo: SourceInfo = {
    version: '1.0.0',
    name: 'nhentai',
    icon: 'icon.png',
    author: 'ItemCookie',
    authorWebsite: 'https://github.com/ItemCookie',
    description: 'Extension which pulls 18+ content from nhentai.',
    contentRating: ContentRating.ADULT,
    websiteBaseURL: Urls.api,
    language: LanguageCode.ENGLISH,
    sourceTags: [
        {
            text: '18+',
            type: TagType.YELLOW,
        },
        {
            text: 'Cloudflare',
            type: TagType.RED,
        },
    ],
}

// TODO(High): Create tests
// TODO(Low): Support multiple languages (AND operator) when searching & subtitletext
export class NHentai extends Source {
    private readonly interceptor: RequestInterceptor = {
        interceptRequest: async (request: Request): Promise<Request> => {
            request.headers = {
                ...request.headers,
                'user-agent': UserAgent,
                referer: `${Urls.api}/`,
            }
            request.incognito = await getIncognito(this.stateManager)
            return request
        },
        interceptResponse: async (response: Response): Promise<Response> => {
            return response
        },
    }

    readonly requestManager = createRequestManager({
        requestsPerSecond: 3,
        requestTimeout: 15000,
        interceptor: this.interceptor,
    })

    readonly fallbackRequestManager = createRequestManager({
        requestsPerSecond: 1,
        requestTimeout: 15000,
        interceptor: this.interceptor,
    })

    readonly stateManager = createSourceStateManager({})

    override async getSourceMenu(): Promise<Section> {
        return createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => [settings(this.stateManager), debugView(this.stateManager), resetSettings(this.stateManager)],
        })
    }

    override getMangaShareUrl(mangaId: string): string {
        return `${Urls.api}/g/${mangaId}`
    }

    override async getSearchTags(): Promise<TagSection[]> {
        const sections: Record<string, TagSection> = {}

        sections.sorting = createTagSection({
            id: 'sorting',
            label: 'Sort by (Select one)',
            tags: SortDefs.getSourceCodes(true).map((source) =>
                createTag({ id: source, label: SortDefs.getName(source) }),
            ),
        })

        sections.language = createTagSection({
            id: 'language',
            label: 'Language (Select one)',
            tags: LangDefs.getSourceCodes(true).map((source) =>
                createTag({ id: source, label: LangDefs.getLocalizedName(source) }),
            ),
        })

        return Object.values(sections)
    }

    override async supportsSearchOperators(): Promise<boolean> {
        return false
    }

    override async supportsTagExclusion(): Promise<boolean> {
        return false
    }

    override async getMangaDetails(mangaId: string): Promise<SourceManga | Manga> {
        const data = await Requests.book(this.requestManager, mangaId)
        const parsed = this.checkErrors(data)
        return BookParser.manga(parsed)
    }

    override async getChapters(mangaId: string): Promise<Chapter[]> {
        const data = await Requests.book(this.requestManager, mangaId)
        const parsed = this.checkErrors(data)
        return [BookParser.chapter(parsed, mangaId)]
    }

    override async getChapterDetails(mangaId: string): Promise<ChapterDetails> {
        const data = await Requests.book(this.requestManager, mangaId)
        const parsed = this.checkErrors(data)
        return BookParser.chapterDetails(parsed, mangaId)
    }

    override async getSearchResults(query: SearchRequest, metadata: SearchMetadata): Promise<PagedResults> {
        const ctx = await Search.createWithSettings(this.stateManager, query.title, {
            language: this.resolveLangauge(query.includedTags),
            sorting: this.resolveSorting(query.includedTags),
        })
        const results = await Search.search(ctx, this.getSearchOptions(), metadata)

        return createPagedResults({
            results: results.tiles ?? [],
            metadata: results.metadata,
        })
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const sections: HomeSection[] = []
        for (const source of SortDefs.getSourceCodes(true)) {
            sections.push(
                createHomeSection({
                    id: source,
                    title: SortDefs.getName(source),
                    view_more: true,
                }),
            )
        }

        for (const section of sections) {
            const ctx = await Search.createWithSettings(this.stateManager, undefined, { sorting: section.id })
            const results = await Search.search(ctx, this.getSearchOptions(), {})

            section.items = results.tiles
            sectionCallback(section)
        }
    }

    override async getViewMoreItems(homepageSectionId: string, metadata: SearchMetadata): Promise<PagedResults> {
        const ctx = await Search.createWithSettings(this.stateManager, undefined, { sorting: homepageSectionId })
        const results = await Search.search(ctx, this.getSearchOptions(), metadata)

        return createPagedResults({
            results: results.tiles ?? [],
            metadata: results.metadata,
        })
    }

    override getCloudflareBypassRequest(): Request {
        return createRequestObject({
            url: Urls.cloudflare,
            method: 'GET',
            headers: {
                'user-agent': UserAgent,
                referer: `${Urls.cloudflare}/`,
            },
        })
    }

    getSearchOptions(): SearchOptions {
        return {
            requests: this.requestManager,
            states: this.stateManager,
            fallback: this.fallbackRequestManager,
            cheerio: this.cheerio,
        }
    }

    private checkErrors<P>(data: Parsed<Response, P>): P {
        checkCloudflare(data.status)
        if (data.parsed == undefined) {
            throw new Error(`Error ${data.status}: ${data.data}`)
        }
        return data.parsed
    }

    private resolveLangauge(includedTags?: Tag[]): string | undefined {
        return includedTags?.find((tag) => LangDefs.data.map((def) => def.source).includes(tag.id))?.id
    }

    private resolveSorting(includedTags?: Tag[]): string | undefined {
        return includedTags?.find((tag) => SortDefs.data.map((def) => def.source).includes(tag.id))?.id
    }
}
