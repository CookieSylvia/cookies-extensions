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
  Requests,
  SearchMetadata,
  SearchObjects,
  SortDefs,
  Urls, 
} from './models';
import { Tags } from './Data';
import { checkCloudflare } from './Utils';

export const NHentaiInfo: SourceInfo = {
  version: '3.0.0',
  name: 'nhentai',
  icon: 'icon.png',
  author: 'ItemCookie',
  authorWebsite: 'https://github.com/ItemCookie',
  description: 'Extension which pulls 18+ content from nhentai.',
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
    return Promise.resolve(App.createDUISection({
      id: 'main',
      header: 'Source Settings',
      rows: () => Promise.resolve([]),
      isHidden: false,
    }));
  }

  async getSearchResults(query: SearchRequest, metadata: SearchMetadata): Promise<PagedResults> {
    throw new Error('Method not implemented.');
  }

  async getSearchTags?(): Promise<TagSection[]> {
    const sections: Record<string, TagSection> = {};

    //sections.sorting = App.createTagSection(); 
    //sections.language = App.createTagSection(); 
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
    const data = await Requests.book(this.requestManager, mangaId);
    const parsed = this.checkErrors(data);
    return BookParser.manga(parsed);
  }

  getMangaShareUrl(mangaId: string): string {
    return `${Urls.api}/g/${mangaId}`;
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const data = await Requests.book(this.requestManager, mangaId);
    const parsed = this.checkErrors(data);
    return [BookParser.chapter(parsed, mangaId)];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getChapterDetails(mangaId: string, _chapterId: string): Promise<ChapterDetails> {
    const data = await Requests.book(this.requestManager, mangaId);
    const parsed = this.checkErrors(data);
    return BookParser.chapterDetails(parsed, mangaId);
  }

  async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getViewMoreItems(homepageSectionId: string, metadata: SearchMetadata): Promise<PagedResults> {
    throw new Error('Method not implemented.');
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
