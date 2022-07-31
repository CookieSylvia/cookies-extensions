import {
    SourceKeychain,
    SourceStateManager, 
} from 'paperback-extensions-common'
import {
    LangDefs,
    SearchContext,
    SearchResults,
    SortDefs, 
} from './models'

export interface SearchHistoryEntry {
    /**
     * The full search query used.
     */
    text: string
    /**
     * The sort used.
     */
    sort?: string
    /**
     * The status code returned by the search request.
     */
    status?: number
    /**
     * Wether the page was to be skipped.
     */
    skipped?: boolean
    /**
     * The reason given to the search result.
     */
    reason?: string
    /**
     * Wether the search was by fallback.
     */
    fallback?: boolean
    /**
     * The next page to search.
     */
    nextPage?: number
    /**
     * The last page to search.
     */
    maxPage?: number
    shouldStop?: boolean
    /**
     * Wether searches stopped.
     */
    stopped?: boolean
}

export const retrieveAs = async <T>(states: SourceStateManager | SourceKeychain, key: string): Promise<T | null> =>
    (await states.retrieve(key)) as T | null

export const getLanguage = async (states: SourceStateManager): Promise<string> => {
    const value = (await retrieveAs<string>(states, 'language')) ?? LangDefs.getDefault()
    if (value == null) {
        throw new Error('No default language found.')
    }
    return value
}
export const setLanguage = async (states: SourceStateManager, language: string | null): Promise<void> => {
    await states.store('language', LangDefs.findSource(language ?? undefined) ?? null)
}

export const getSorting = async (states: SourceStateManager): Promise<string> => {
    const value = (await retrieveAs<string>(states, 'sorting')) ?? SortDefs.getDefault()
    if (value == null) {
        throw new Error('No default sorting found.')
    }
    return value
}
export const setSorting = async (states: SourceStateManager, sorting: string | null): Promise<void> => {
    await states.store('sorting', SortDefs.findSource(sorting ?? undefined) ?? null)
}

export const getSearchSuffix = async (states: SourceStateManager): Promise<string> => {
    return (await retrieveAs(states, 'search_suffix')) ?? ''
}
export const setSearchSuffix = async (states: SourceStateManager, searchSuffix: string | null): Promise<void> => {
    await states.store('search_suffix', searchSuffix)
}

export const getDoubleSearch = async (states: SourceStateManager): Promise<boolean> => {
    return (await retrieveAs(states, 'double_search')) ?? false
}
export const setDoubleSearch = async (states: SourceStateManager, doubleSearch: boolean | null): Promise<void> => {
    await states.store('double_search', doubleSearch)
}

export const getIncognito = async (states: SourceStateManager): Promise<boolean> => {
    return (await retrieveAs(states, 'incognito')) ?? true
}
export const setIncognito = async (states: SourceStateManager, incognito: boolean | null): Promise<void> => {
    await states.store('incognito', incognito)
}

export const getAlwaysFallback = async (states: SourceStateManager): Promise<boolean> => {
    return (await retrieveAs(states, 'always_fallback')) ?? false
}
export const setAlwaysFallback = async (states: SourceStateManager, alwaysFallback: boolean | null): Promise<void> => {
    await states.store('always_fallback', alwaysFallback)
}

export const getCollectSearches = async (states: SourceStateManager): Promise<boolean> => {
    return (await retrieveAs(states, 'collect_searches')) ?? false
}
export const setCollectSearches = async (
    states: SourceStateManager,
    collectSearches: boolean | null,
): Promise<void> => {
    await states.store('collect_searches', collectSearches)
}

export const getSearchHistory = async (states: SourceStateManager): Promise<SearchHistoryEntry[]> => {
    return (await retrieveAs(states, 'search_history')) ?? []
}

export const setSearchHistory = async (
    states: SourceStateManager,
    history: SearchHistoryEntry[] | null,
): Promise<void> => {
    if (history == null) {
        await states.store('search_history', null)
        return
    }
    if (!(await getCollectSearches(states))) {
        return // guard against collection
    }
    await states.store('search_history', history)
}

export const addSearchHistory = async (states: SourceStateManager, results: SearchHistoryEntry): Promise<void> => {
    if (!(await getCollectSearches(states))) {
        return // guard against collection
    }
    // history [newest, ..., oldest] with max length of 25
    const history = await getSearchHistory(states)
    if (history.length >= 25) {
        history.pop()
    }
    history.splice(0, 0, results)
    await setSearchHistory(states, history)
}

export const createHistoryEntry = (context: SearchContext | string, results?: SearchResults): SearchHistoryEntry => {
    return {
        text: typeof context === 'string' ? context : context.text,
        sort: typeof context !== 'string' ? context.sort : undefined,
        stopped: results?.tiles == undefined || results.tiles.length <= 0,
        status: results?.status,
        skipped: results?.skip,
        reason: results?.reason,
        fallback: results?.fallback,
        nextPage: results?.metadata.nextPage,
        maxPage: results?.metadata.maxPage,
        shouldStop: results?.metadata.shouldStop,
    }
}

export const getLatestSearch = async (states: SourceStateManager): Promise<string> => {
    return (await getSearchHistory(states))[0]?.text ?? '<none>'
}

export const migrate = async (states: SourceStateManager): Promise<boolean> => {
    const values = await Promise.all([
        // Migrate from extensions-sources (nsfw)
        retrieveAs<string[]>(states, 'languages'),
        retrieveAs<string[]>(states, 'sort_order'),
        retrieveAs<string>(states, 'extra_args'),
        // Removed in v2
        retrieveAs<string>(states, 'latest_search'),
    ])

    const updates: Promise<unknown>[] = []
    if (values[0] != null) {
        console.log(`Migrating old language [${values[0].join(', ')}]`)
        // prettier-ignore
        updates.push(setLanguage(states, LangDefs.getFilteredSources(values[0], true)[0] ?? null).then(() => states.store('languages', null)))
    }
    if (values[1] != null) {
        console.log(`Migrating old sorting [${values[1].join(', ')}]`)
        // prettier-ignore
        updates.push(setSorting(states, SortDefs.getFilteredSources(values[1], true)[0] ?? null).then(() => states.store('sort_order', null)))
    }
    if (values[2] != null) {
        console.log(`Migrating old search suffix '${values[2]}'`)
        // prettier-ignore
        updates.push(setSearchSuffix(states, values[2]).then(() => states.store('extra_args', null)))
    }
    if (values[3] != null) {
        console.log(`Migrating latest search (v2) '${values[3]}'`)
        // prettier-ignore
        updates.push(setSearchHistory(states, [{ text: values[3], reason: 'Migrated' }]).then(() => states.store('latest_search', null)))
    }

    if (updates.length > 0) {
        await Promise.all(updates)
        console.log(`Successfully migrated ${updates.length} setting(s)!`)
        return true
    }
    return false
}

export const reset = async (states: SourceStateManager): Promise<void> => {
    await Promise.all([
        states.store('language', null),
        states.store('sorting', null),
        states.store('search_suffix', null),
        states.store('incognito', null),
        states.store('always_fallback', null),
        states.store('collect_searches', null),
        states.store('search_history', null),
        states.store('double_search', null),
    ])
}

export const resetSettings = (states: SourceStateManager) =>
    createButton({
        id: 'reset',
        label: 'Reset to Default',
        value: '',
        onTap: async () => await reset(states),
    })
