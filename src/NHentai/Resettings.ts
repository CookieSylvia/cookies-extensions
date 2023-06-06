import { SourceStateManager } from '@paperback/types';
import {
  LangDefs,
  SearchContext,
  SearchResults,
  SortDefs, 
} from './models';
import { dumbify } from './Utils';

export type SearchHistoryEntry = {
  /**
   * The full search query used.
   */
  text: string;
  /**
   * The sort used.
   */
  sort?: string;
  /**
   * The status code returned by the search request.
   */
  status?: number;
  /**
   * Whether the `cf-mitigated: challenge` header was present.
   */
  challenged?: boolean;
  /**
   * Whether the page was to be skipped.
   */
  skipped?: boolean;
  /**
   * The reason given to the search result.
   */
  reason?: string;
  /**
   * Whether the search was by fallback.
   */
  fallback?: boolean;
  /**
   * The next page to search.
   */
  nextPage?: number;
  /**
   * The last page to search.
   */
  maxPage?: number;
  shouldStop?: boolean;
  /**
   * Whether searches stopped.
   */
  stopped?: boolean;
};

export const SettingKeys = Object.freeze({
  // History
  CollectSearches: 'collect_searches',
  CollectSearchesLimit: 'collect_searches_limit',
  SearchHistory: 'search_history',
  // Searching
  AlwaysFallback: 'always_fallback',
  DoubleSearch: 'double_search',
  SearchSuffix: 'search_suffix',
  Language: 'language',
  Sorting: 'sorting',
});

export interface SettingsObject {
  // History
  [SettingKeys.CollectSearches]: boolean;
  [SettingKeys.CollectSearchesLimit]: number;
  [SettingKeys.SearchHistory]: SearchHistoryEntry[] | Readonly<SearchHistoryEntry[]>;
  // Searching
  [SettingKeys.AlwaysFallback]: boolean;
  [SettingKeys.DoubleSearch]: boolean;
  [SettingKeys.SearchSuffix]: string;
  [SettingKeys.Language]: string;
  [SettingKeys.Sorting]: string;
}

export const DefaultSettings: Readonly<SettingsObject> = Object.freeze({
  // History
  [SettingKeys.CollectSearches]: false,
  [SettingKeys.CollectSearchesLimit]: 20,
  [SettingKeys.SearchHistory]: Object.freeze([]),
  // Searching
  [SettingKeys.AlwaysFallback]: false,
  [SettingKeys.DoubleSearch]: false,
  [SettingKeys.SearchSuffix]: '',
  [SettingKeys.Language]: LangDefs.getDefault() ?? 'english',
  [SettingKeys.Sorting]: SortDefs.getDefault() ?? 'date',
});

export type SettingKey = (typeof SettingKeys)[(keyof typeof SettingKeys)];
export type SettingType<T extends SettingKey> = SettingsObject[T];

export const Resettings = {

  _isValid(key: SettingKey, val: unknown): boolean {
    if (val == undefined) {
      return false;
    }
    const def = DefaultSettings[key];
    if (typeof def !== typeof val) {
      return false;
    }
    if (Array.isArray(def) !== Array.isArray(val)) {
      return false;
    }
    return true;
  },

  async set<T extends SettingKey, P extends SettingType<T>>(states: SourceStateManager | undefined, key: T, value?: P): Promise<P> {
    if (states == undefined) {
      return DefaultSettings[key] as P;
    }
    const old = this.get<T, P>(states, key);
    if (value == undefined || this._isValid(key, value)) {
      await states.store(key, value ?? null);
    }
    return old;
  },

  async get<T extends SettingKey, P extends SettingType<T>>(states: SourceStateManager | undefined, key: T): Promise<P> {
    if (states == undefined) {
      return DefaultSettings[key] as P;
    }
    const stored = await states.retrieve(key) as P;
    if (!this._isValid(key, stored)) {
      if (stored !== null) {
        await states.store(key, null);
      }
      return DefaultSettings[key] as P;
    }
    return stored;
  },

  async has<T extends SettingKey>(states: SourceStateManager | undefined, key: T): Promise<boolean> {
    if (states == undefined) {
      return false;
    }
    const stored = await states.retrieve(key);
    return this._isValid(key, stored);
  },

  async clear(states: SourceStateManager | undefined): Promise<void> {
    if (states == undefined) {
      return;
    }
    const tasks: Promise<unknown>[] = [];
    for (const key of Object.values(SettingKeys)) {
      tasks.push(this.set(states, key));
    }
    await Promise.allSettled(tasks);
  },

  // Search

  async setLanguage(states: SourceStateManager | undefined, source?: string | null): Promise<void> {
    await this.set(states, SettingKeys.Language, LangDefs.findSource(source ?? undefined));
  },

  async setSorting(states: SourceStateManager | undefined, source?: string | null): Promise<void> {
    await this.set(states, SettingKeys.Sorting, SortDefs.findSource(source ?? undefined));
  },

  async setSearchSuffix(states: SourceStateManager | undefined, suffix?: string | null): Promise<void> {
    await this.set(states, SettingKeys.SearchSuffix, suffix != null ? dumbify(suffix) : undefined);
  },

  // History

  _createHistoryEntry(ctx: SearchContext | string, results?: SearchResults): SearchHistoryEntry {
    return {
      text: typeof ctx === 'string' ? ctx : ctx.text,
      sort: typeof ctx !== 'string' ? ctx.sort : undefined,
      stopped: results?.partials == undefined || results.partials.length <= 0,
      status: results?.status,
      challenged: results?.challenged,
      skipped: results?.skip,
      reason: results?.reason,
      fallback: results?.fallback,
      nextPage: results?.metadata.nextPage,
      maxPage: results?.metadata.maxPage,
      shouldStop: results?.metadata.shouldStop,
    };
  },

  async addHistoryEntry(states: SourceStateManager | undefined, ctx: SearchContext, results?: SearchResults): Promise<void> {
    if (!await this.get(states, SettingKeys.CollectSearches)) {
      return;
    }
    const entry = this._createHistoryEntry(ctx, results);
    const history = [...await this.get(states, SettingKeys.SearchHistory)];
    if (history.length >= await this.get(states, SettingKeys.CollectSearchesLimit)) {
      history.pop();
    }
    history.splice(0, 0, entry);
    await this.set(states, SettingKeys.SearchHistory, history);
  },

  _clamp(val: number, boundA: number, boundB: number): number {
    const min = Math.min(boundA,boundB);
    const max = Math.max(boundA,boundB);
    return Math.min(Math.max(val, min), max);
  },

  async setLimit(states: SourceStateManager | undefined, limit?: number | null): Promise<void> {
    await this.set(states, SettingKeys.CollectSearchesLimit, limit != null ? Math.floor(this._clamp(limit, 10, 250)) : undefined);
  },

};

export const resetSettings = (states: SourceStateManager) =>
  App.createDUIButton({
    id: 'reset',
    label: 'Reset to Default',
    onTap: () => Resettings.clear(states),
  });
