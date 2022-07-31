import { SourceStateManager } from 'paperback-extensions-common'
import {
    showFrozen,
    stringifySearchEntry,
    yesno, 
} from '../Debug'
import {
    getAlwaysFallback,
    getCollectSearches,
    getDoubleSearch,
    getIncognito,
    getLanguage,
    getLatestSearch,
    getSearchHistory,
    getSearchSuffix,
    getSorting,
    setSearchHistory,
} from '../Settings'
import { createNavSections } from './DebugUI'

export const storedSettingsSection = (states: SourceStateManager) =>
    createSection({
        id: 'debug_settings',
        header: 'Stored Settings',
        rows: async () => {
            const values = await Promise.all([
                getLanguage(states),
                getSorting(states),
                getSearchSuffix(states),
                getIncognito(states),
                getDoubleSearch(states),
                getAlwaysFallback(states),
                getCollectSearches(states),
                getLatestSearch(states),
            ])
            return [
                createLabel({
                    id: 'debug_settings_language',
                    label: 'Language',
                    value: values[0],
                }),
                createLabel({
                    id: 'debug_settings_sorting',
                    label: 'Sort by',
                    value: values[1],
                }),
                createMultilineLabel({
                    id: 'debug_settings_search_suffix',
                    label: 'Search suffix',
                    value: values[2],
                }),
                createLabel({
                    id: 'debug_settings_incognito',
                    label: 'Incognito',
                    value: yesno(values[3]),
                }),
                createLabel({
                    id: 'debug_settings_double_search',
                    label: 'Double search',
                    value: yesno(values[4]),
                }),
                createLabel({
                    id: 'debug_settings_always_fallback',
                    label: 'Always fallback',
                    value: yesno(values[5]),
                }),
                createLabel({
                    id: 'debug_settings_collect_searches',
                    label: 'Collect searches',
                    value: yesno(values[6]),
                }),
                createMultilineLabel({
                    id: 'debug_settings_latest_search',
                    label: showFrozen('Latest search', !values[6]),
                    value: `${values[7]}`,
                }),
                storedSearchHistoryNavButton(states),
                clearSearchHistoryButton(states),
            ]
        },
    })

export const clearSearchHistoryButton = (states: SourceStateManager) =>
    createButton({
        id: 'debug_settings_clear_search_history',
        label: 'Clear search history...',
        value: '',
        onTap: async () => {
            await setSearchHistory(states, null)
        },
    })

export const storedSearchHistoryNavButton = (states: SourceStateManager) =>
    createNavSections({
        id: 'debug_settings_history',
        label: 'Search history',
        sections: async () => [clearSearchHistorySection(states), await storedSearchHistorySection(states)],
    })

export const clearSearchHistorySection = (states: SourceStateManager) =>
    createSection({
        id: 'debug_settings_history_clear',
        header: 'Data',
        footer: 'Search history saves up to 25 entries.',
        rows: async () => [clearSearchHistoryButton(states)],
    })

export const storedSearchHistorySection = async (states: SourceStateManager) =>
    createSection({
        id: 'debug_settings_history_data',
        header: showFrozen('Search history', !(await getCollectSearches(states))),
        rows: async () => {
            const history = await getSearchHistory(states)
            if (history.length <= 0) {
                // prettier-ignore
                return [createLabel({
                    id: 'debug_settings_history_empty',
                    label: 'Search history is empty',
                    value: '',
                })]
            }
            return history.map((entry, idx) => {
                return createMultilineLabel({
                    id: `debug_settings_history_data[${idx}]`,
                    label: `Entry #${idx + 1}`,
                    value: stringifySearchEntry(entry),
                })
            })
        },
    })
