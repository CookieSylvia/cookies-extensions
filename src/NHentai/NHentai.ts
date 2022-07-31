import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    LanguageCode,
    Manga,
    MangaTile,
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
    LangDefs,
    SortDefs,
    Urls,
    UserAgent,
    Parsed,
    SearchObjects,
    Requests,
    BookParser,
    SearchMetadata,
    Search,
    SearchResults,
} from './models'
import {
    addSearchHistory,
    createHistoryEntry,
    getDoubleSearch,
    getIncognito,
    migrate,
    resetSettings, 
} from './Settings'
import {
    debugNavButton,
    settingsNavButton, 
} from './ui'
import { checkCloudflare } from './Utils'

export const NHentaiInfo: SourceInfo = {
    version: '2.0.0',
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

// TODO(High): Figure out how to bypass Cloudflare during testing.
// TODO(Low): Refector UI stuff, as it's pretty terrible atm.
// TODO(Low): Update settings to allow changing languages to match search functionality.
// TODO(Low): Allow toggling homepage sections.
// TODO(Low): Do something about all those '// prettier-ignore' comments.
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
            rows: async () => {
                await migrate(this.stateManager)
                return [
                    settingsNavButton(this.stateManager),
                    debugNavButton(this.stateManager),
                    resetSettings(this.stateManager),
                ]
            },
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
            tags: SortDefs.getSources(true).map((source) => createTag({ id: source, label: SortDefs.getName(source) })),
        })

        sections.language = createTagSection({
            id: 'languages',
            label: 'Languages',
            tags: LangDefs.getSources(true).map((source) =>
                createTag({ id: source, label: LangDefs.getLocalizedName(source) }),
            ),
        })

        sections.other = createTagSection({
            id: 'other',
            label: 'Other',
            tags: [
                createTag({ id: 'without_suffix', label: 'Without suffix' }),
                // Allows for pressing search without actually searching anything.
                createTag({ id: 'allow_empty', label: 'Allow empty search' }),
            ],
        })

        return Object.values(sections)
    }

    override async supportsSearchOperators(): Promise<boolean> {
        return false
    }

    override async supportsTagExclusion(): Promise<boolean> {
        return true
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
            languages: {
                include: this.resolveLangauges(query.includedTags),
                exclude: this.resolveLangauges(query.excludedTags),
            },
            sort: this.resolveSorting(query.includedTags),
            suffix: this.resolvesTag(query.includedTags, 'without_suffix') ? '' : undefined,
        })
        const searches = (await getDoubleSearch(this.stateManager)) ? 2 : 1

        let tiles: MangaTile[] = []
        for (let i = 0; i < searches; i++) {
            let results: SearchResults | undefined = undefined
            try {
                results = await Search.search(ctx, this.getSearchObjects(), metadata)
            } finally {
                await addSearchHistory(this.stateManager, createHistoryEntry(ctx, results))
            }

            tiles = tiles.concat(results.tiles ?? [])
            metadata = results.metadata

            if (metadata.shouldStop || (results.tiles ?? []).length <= 0) {
                break
            }
        }

        return createPagedResults({
            results: tiles,
            metadata,
        })
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const sections: HomeSection[] = []
        for (const source of SortDefs.getSources(true)) {
            sections.push(
                createHomeSection({
                    id: source,
                    title: SortDefs.getName(source),
                    view_more: true,
                }),
            )
        }

        for (const section of sections) {
            const ctx = await Search.createWithSettings(this.stateManager, undefined, { sort: section.id })
            const results = await Search.search(ctx, this.getSearchObjects(), {})

            section.items = results.tiles
            sectionCallback(section)
        }
    }

    override async getViewMoreItems(homepageSectionId: string, metadata: SearchMetadata): Promise<PagedResults> {
        const ctx = await Search.createWithSettings(this.stateManager, undefined, { sort: homepageSectionId })
        const results = await Search.search(ctx, this.getSearchObjects(), metadata)

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

    getSearchObjects(): SearchObjects {
        return {
            requests: this.requestManager,
            states: this.stateManager,
            fallback: this.fallbackRequestManager,
            cheerio: this.cheerio,
        }
    }

    private checkErrors<P>(data: Parsed<P>): P {
        checkCloudflare(data.status)
        if (data.parsed == undefined) {
            throw new Error(`Error ${data.status}: ${data.data}`)
        }
        return data.parsed
    }

    private resolveLangauges(tags?: Tag[]): string[] {
        return LangDefs.getFilteredSources(tags?.map((tag) => tag.id) ?? [], true)
    }

    private resolveSorting(tags?: Tag[]): string | undefined {
        return SortDefs.getFilteredSources(tags?.map((tag) => tag.id) ?? [], true)[0]
    }

    private resolvesTag(tags: Tag[] | undefined, id: string): boolean {
        return tags?.find((tag) => tag.id === id) != undefined
    }
}
