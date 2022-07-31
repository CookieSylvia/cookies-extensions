import { Data } from '../Data'
import {
    stringifyLanguage,
    stringifySearchOptions,
    stringifySorting, 
} from '../Debug'
import {
    EmptySearch,
    LangDefs,
    SortDefs,
    UserAgent, 
} from '../models'
import { createNavSections } from './DebugUI'

export const packagedDataSection = () =>
    createSection({
        id: 'debug_pkg',
        header: 'Packaged Data',
        rows: async () => [
            createMultilineLabel({
                id: 'debug_pkg_ua',
                label: 'User Agent Data',
                value: UserAgent,
            }),
            createMultilineLabel({
                id: 'debug_pkg_empty_search',
                label: 'Empty Search',
                value: EmptySearch,
            }),
            packagedUrlNavButton(),
            packagedPathNavButton(),
            packagedLanguageNavButton(),
            packagedSortingNavButton(),
            packagedDebugNavButton(),
        ],
    })

export const packagedUrlNavButton = () =>
    createNavSections({
        id: 'debug_pkg_url',
        label: 'Url Data',
        sections: async () => [packagedUrlSection()],
    })

export const packagedPathNavButton = () =>
    createNavSections({
        id: 'debug_pkg_path',
        label: 'Path Data',
        sections: async () => [packagedPathSection()],
    })

export const packagedLanguageNavButton = () =>
    createNavSections({
        id: 'debug_pkg_language',
        label: 'Language Data',
        sections: async () => [packagedLanguageSection()],
    })

export const packagedSortingNavButton = () =>
    createNavSections({
        id: 'debug_pkg_sort',
        label: 'Sorting Data',
        sections: async () => [packagedSortingSection()],
    })

export const packagedDebugNavButton = () =>
    createNavSections({
        id: 'debug_pkg_debug',
        label: 'Debug Data',
        sections: async () => [
            // prettier-ignore
            packagedDebugSearchSection(),
            packagedDebugReplaceSection(),
        ],
    })

export const packagedUrlSection = () =>
    createSection({
        id: 'debug_pkg_url_data',
        header: 'Definitions',
        rows: async () =>
            Object.entries(Data.nhentai.urls).map(([key, url]) => {
                return createMultilineLabel({
                    id: `debug_pkg_url_data[${key}]`,
                    label: key,
                    value: url,
                })
            }),
    })

export const packagedPathSection = () =>
    createSection({
        id: 'debug_pkg_path_data',
        header: 'Definitions',
        footer: "See 'Debug > Formatting' for formatted variants.",
        rows: async () =>
            Object.entries(Data.nhentai.paths).map(([key, path]) => {
                return createMultilineLabel({
                    id: `debug_pkg_path_data[${key}]`,
                    label: key,
                    value: `Url: ${path.url}\nPath: ${path.path}`,
                })
            }),
    })

export const packagedLanguageSection = () =>
    createSection({
        id: 'debug_pkg_language_data',
        header: 'Definitions',
        rows: async () =>
            LangDefs.defs.map((def) => {
                return createMultilineLabel({
                    id: `debug_pkg_language_data[${def.source}]`,
                    label: def.name,
                    value: stringifyLanguage(def),
                })
            }),
    })

export const packagedSortingSection = () =>
    createSection({
        id: 'debug_pkg_sort_data',
        header: 'Definitions',
        rows: async () =>
            SortDefs.defs.map((def) => {
                return createMultilineLabel({
                    id: `debug_pkg_sort_data[${def.source}]`,
                    label: def.name,
                    value: stringifySorting(def),
                })
            }),
    })

export const packagedDebugSearchSection = () =>
    createSection({
        id: 'debug_pkg_debug_data_search',
        header: 'Search Data',
        rows: async () => {
            return Data.debug.search.map((search, idx) => {
                return createMultilineLabel({
                    id: `debug_pkg_debug_data_search[${idx}]`,
                    label: `Search #${idx}`,
                    value: stringifySearchOptions(search),
                })
            })
        },
    })

export const packagedDebugReplaceSection = () =>
    createSection({
        id: 'debug_pkg_debug_data_replace',
        header: 'Replacement Data',
        rows: async () =>
            Object.entries(Data.debug.replacements).map(([key, replace]) => {
                return createMultilineLabel({
                    id: `debug_pkg_debug_data_replace[${key}]`,
                    label: key,
                    value: replace,
                })
            }),
    })
