import {
  BadgeColor,
  Chapter,
  ChapterDetails,
  ChapterProviding,
  CloudflareBypassRequestProviding,
  ContentRating,
  DUISection,
  HomePageSectionsProviding,
  HomeSection,
  HomeSectionType,
  MangaProviding,
  PagedResults,
  Request,
  Response,
  SearchRequest,
  SearchResultsProviding,
  SourceInfo,
  SourceIntents,
  SourceInterceptor,
  SourceManga,
  Tag,
  TagSection,
} from '@paperback/types';
import {
  BookParser,
  LangDefs,
  Parsed,
  Paths,
  Requests,
  Search,
  SearchMetadata,
  SearchObjects,
  SortDefs,
  Urls, 
} from './models';
import { Tags } from './Data';
import { checkCloudflare } from './Utils';
import { Data } from './Data';
import {
  Resettings,
  SettingKeys,
  resetSettings,
} from './Resettings';
import { settingsNavButton } from './ui/SettingsUI';

export const NHentaiInfo: SourceInfo = {
  version: Data.info.version,
  name: Data.info.name,
  icon: 'icon.png',
  author: Data.info.author,
  authorWebsite: Data.info.website,
  description: Data.info.description,
  contentRating: ContentRating.ADULT,
  websiteBaseURL: Urls.api,
  intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED | SourceIntents.SETTINGS_UI,
  sourceTags: [
    {
      text: '18+',
      type: BadgeColor.YELLOW,
    },
  ],
};

export class NHentai implements SearchResultsProviding, MangaProviding, ChapterProviding, HomePageSectionsProviding, CloudflareBypassRequestProviding {

  constructor(public readonly cheerio: CheerioAPI) {}

  readonly sourceInterceptor: SourceInterceptor = {
    interceptRequest: async (request: Request): Promise<Request> => {
      request.headers = {
        ...(request.headers ?? {}),
        ...{
          'referer': `${Urls.api}/`,
          'user-agent': await this.requestManager.getDefaultUserAgent(),
        },
      };
      return request;
    },
    interceptResponse: async (response: Response): Promise<Response> => {
      return response;
    },
  };

  readonly requestManager = App.createRequestManager({
    requestsPerSecond: 3,
    requestTimeout: 15000,
    interceptor: this.sourceInterceptor,
  });

  readonly fallbackRequestManager = App.createRequestManager({
    requestsPerSecond: 1,
    requestTimeout: 15000,
    interceptor: this.sourceInterceptor,
  });

  readonly stateManager = App.createSourceStateManager();

  async getSourceMenu(): Promise<DUISection> {
    return App.createDUISection({
      id: 'main',
      header: 'Source Settings',
      footer: 'You might need to restart the app for some changes to apply visually.',
      isHidden: false,
      rows: async () => [
        settingsNavButton(this.stateManager, this.requestManager),
        resetSettings(this.stateManager),
      ],
    });
  }

  async getSearchResults(query: SearchRequest, metadata: SearchMetadata): Promise<PagedResults> {
    Paths.randomizeImageServer();
    const ctx = await Search.createWithSettings(this.stateManager, query.title, {
      languages: {
        include: this.resolveLangauges(query.includedTags),
        exclude: this.resolveLangauges(query.excludedTags),
      },
      sort: this.resolveSorting(query.includedTags),
      suffix: this.resolvesTag(query.includedTags, Tags.withoutSuffix) ? '' : undefined,
    });

    const double = await Resettings.get(this.stateManager, SettingKeys.DoubleSearch);
    const results = await Search.searchMany(double ? 2 : 1, ctx, this.getSearchObjects(), metadata);

    return App.createPagedResults({
      results: results.partials,
      metadata: results.metadata,
    });
  }

  async getSearchTags(): Promise<TagSection[]> {
    const sections: Record<string, TagSection> = {};

    sections.sorting = App.createTagSection({
      id: 'sorting',
      label: 'Sort by (Select one)',
      tags: SortDefs.getSources(true).map((source) => App.createTag({ id: source, label: SortDefs.getName(source) })),
    });

    sections.language = App.createTagSection({
      id: 'languages',
      label: 'Languages',
      tags: LangDefs.getSources(true).map((source) => 
        App.createTag({ id: source, label: LangDefs.getLocalizedName(source) }),
      ),
    }); 
    
    sections.other = App.createTagSection({
      id: 'other',
      label: 'Other',
      tags: [
        App.createTag({ id: Tags.withoutSuffix, label: 'Without suffix' }),
        // Allows for pressing search without actually searching anything.
        App.createTag({ id: Tags.allowEmptySearch, label: 'Allow empty search' }),
      ],
    });

    return Object.values(sections);
  }

  async supportsTagExclusion(): Promise<boolean> {
    return true;
  }

  async supportsSearchOperators(): Promise<boolean> {
    return false;
  }
  
  async getMangaDetails(mangaId: string): Promise<SourceManga> {
    Paths.randomizeImageServer();
    const data = await Requests.book(this.requestManager, mangaId);
    const parsed = this.checkErrors(data);
    return BookParser.manga(parsed);
  }

  getMangaShareUrl(mangaId: string): string {
    return `${Urls.api}/g/${mangaId}`;
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    Paths.randomizeImageServer();
    const data = await Requests.book(this.requestManager, mangaId);
    const parsed = this.checkErrors(data);
    return [BookParser.chapter(parsed, mangaId)];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getChapterDetails(mangaId: string, _chapterId: string): Promise<ChapterDetails> {
    Paths.randomizeImageServer();
    const data = await Requests.book(this.requestManager, mangaId);
    const parsed = this.checkErrors(data);
    return BookParser.chapterDetails(parsed, mangaId);
  }

  async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
    Paths.randomizeImageServer();
    const sections: HomeSection[] = [];
    for (const source of SortDefs.getSources(true)) {
      sections.push(
        App.createHomeSection({
          id: source,
          title: SortDefs.getName(source),
          type: HomeSectionType.singleRowNormal,
          containsMoreItems: true,
        }),
      );
    }
    const searches: Promise<void>[] = [];
    for (const section of sections) {
      sectionCallback(section);
      searches.push(
        Search.createWithSettings(this.stateManager, undefined, { sort: section.id }).then(async (ctx) => {
          const results = await Search.search(ctx, this.getSearchObjects(), {});
          section.items = results.partials ?? [];
          section.containsMoreItems = results.metadata.shouldStop === false && section.items.length > 0;
          sectionCallback(section);
        }),
      );
    }

    await Promise.all(searches);
  }

  async getViewMoreItems(homepageSectionId: string, metadata: SearchMetadata): Promise<PagedResults> {
    Paths.randomizeImageServer();
    const ctx = await Search.createWithSettings(this.stateManager, undefined, { sort: homepageSectionId });
    const results = await Search.search(ctx, this.getSearchObjects(), metadata);

    return App.createPagedResults({
      results: results.partials,
      metadata: results.metadata,
    });
  }

  async getCloudflareBypassRequestAsync(): Promise<Request> {
    return App.createRequest({
      url: Urls.api,
      method: 'GET',
      headers: {
        'referer': `${Urls.api}/`,
        'user-agent': await this.requestManager.getDefaultUserAgent(),
      },
    });
  }

  getSearchObjects(): SearchObjects {
    return {
      requests: this.requestManager,
      states: this.stateManager,
      cheerio: this.cheerio,
      fallback: this.fallbackRequestManager,
    };
  }

  checkErrors<P>(data: Parsed<P>): P {
    checkCloudflare(data.cfChallenge);
    if (data.parsed == null) {
      throw new Error(`Error ${data.status}: ${data.data ?? 'No data'}`);
    }
    return data.parsed;
  }

  resolveLangauges(tags?: Tag[]): string[] {
    return LangDefs.getFilteredSources(tags?.map((tag) => tag.id) ?? [], true);
  }

  resolveSorting(tags?: Tag[]): string | undefined {
    return SortDefs.getFilteredSources(tags?.map((tag) => tag.id) ?? [], true)[0];
  }

  resolvesTag(tags: Tag[] | undefined, id: string): boolean {
    return tags?.find((tag) => tag.id === id) != undefined;
  }
  
}
