import {
    SourceKeychain,
    SourceStateManager, 
} from 'paperback-extensions-common'
import {
    EmptySearch,
    LangDefs,
    Search,
    SortDefs,
    UserAgent, 
} from './models'
import { Data } from './SourceData'
import {
    combos,
    dumbify,
    format, 
} from './Utils'

export const retrieveAs = async <T>(states: SourceStateManager | SourceKeychain, key: string): Promise<T> =>
    (await states.retrieve(key)) as T

export const getLanguage = async (states: SourceStateManager): Promise<string> => {
    return (await retrieveAs(states, 'language')) ?? LangDefs.getDefault()
}

export const getSorting = async (states: SourceStateManager): Promise<string> => {
    return (await retrieveAs(states, 'sorting')) ?? SortDefs.getDefault()
}

export const getSearchSuffix = async (states: SourceStateManager): Promise<string> => {
    return (await retrieveAs(states, 'search_suffix')) ?? ''
}

export const getIncognito = async (states: SourceStateManager): Promise<boolean> => {
    return (await retrieveAs(states, 'incognito')) ?? true
}

export const getAlwaysFallback = async (states: SourceStateManager): Promise<boolean> => {
    return (await retrieveAs(states, 'always_fallback')) ?? false
}

export const getCollectSearches = async (states: SourceStateManager): Promise<boolean> => {
    return (await retrieveAs(states, 'collect_searches')) ?? false
}

export const setLatestSearch = async (states: SourceStateManager, text: string | null): Promise<void> => {
    if ((await getCollectSearches(states)) || text === null) {
        await states.store('latest_search', text)
    }
}

export const getLatestSearch = async (states: SourceStateManager): Promise<string> => {
    return (await retrieveAs(states, 'latest_search')) ?? '<none>'
}

export const reset = async (states: SourceStateManager): Promise<void> => {
    await Promise.all([
        states.store('language', null),
        states.store('sorting', null),
        states.store('search_suffix', null),
        states.store('incognito', null),
        states.store('always_fallback', null),
        states.store('collect_searches', null),
        states.store('latest_search', null),
    ])
}

type ContentValues = {
    language: [string]
    sorting: [string]
    search_suffix: string
    incognito: boolean
}

export const settings = (states: SourceStateManager) =>
    createNavigationButton({
        id: 'settings',
        label: 'Settings',
        value: '',
        form: createForm({
            onSubmit: async (values: ContentValues) => {
                await Promise.all([
                    states.store('language', values.language[0]),
                    states.store('sorting', values.sorting[0]),
                    states.store('search_suffix', dumbify(values.search_suffix)),
                    states.store('incognito', values.incognito),
                ])
            },
            validate: async () => true,
            sections: async () => [
                createSection({
                    id: 'content',
                    header: 'nhentai',
                    footer: 'Modify the nhentai experience to your liking.',
                    rows: async () => {
                        const values = await Promise.all([
                            getLanguage(states),
                            getSorting(states),
                            getSearchSuffix(states),
                        ])
                        return [
                            createSelect({
                                id: 'language',
                                label: 'Language',
                                options: LangDefs.getSourceCodes(true),
                                displayLabel: (option) => LangDefs.getLocalizedName(option),
                                value: [values[0]],
                                allowsMultiselect: false,
                                minimumOptionCount: 1,
                            }),
                            createSelect({
                                id: 'sorting',
                                label: 'Sort by',
                                options: SortDefs.getSourceCodes(true),
                                displayLabel: (option) => SortDefs.getName(option),
                                value: [values[1]],
                                allowsMultiselect: false,
                                minimumOptionCount: 1,
                            }),
                            createInputField({
                                id: 'search_suffix',
                                label: 'Additional arguments',
                                placeholder: '-yaoi -bbm -netorare -scat',
                                maskInput: false,
                                value: values[2],
                            }),
                        ]
                    },
                }),
                createSection({
                    id: 'web',
                    header: 'Web Requests',
                    rows: async () => {
                        const values = await Promise.all([getIncognito(states)])
                        return [
                            createSwitch({
                                id: 'incognito',
                                label: 'Incognito',
                                value: values[0],
                            }),
                        ]
                    },
                }),
            ],
        }),
    })

export const resetSettings = (states: SourceStateManager) =>
    createButton({
        id: 'reset',
        label: 'Reset to Default',
        value: '',
        onTap: async () => await reset(states),
    })

// Debug

type DebugValues = {
    collect_searches: boolean
    always_fallback: boolean
}

export const debugView = (states: SourceStateManager) =>
    createNavigationButton({
        id: 'debug',
        label: 'Debug',
        value: '',
        form: createForm({
            onSubmit: async (values: DebugValues) => {
                await Promise.all([
                    states.store('collect_searches', values.collect_searches),
                    states.store('always_fallback', values.always_fallback),
                ])
            },
            validate: async (): Promise<boolean> => true,
            sections: async () => [
                createSection({
                    id: 'debug_overview',
                    header: 'Overview',
                    footer: 'Always fallback is for debugging, and is limited to 1 request per second. (aka. Slow searching)',
                    rows: async () => {
                        const values = await Promise.all([getCollectSearches(states), getAlwaysFallback(states)])
                        return [
                            createSwitch({
                                id: 'collect_searches',
                                label: 'Collect searches',
                                value: values[0],
                            }),
                            createSwitch({
                                id: 'always_fallback',
                                label: 'Always fallback',
                                value: values[1],
                            }),
                        ]
                    },
                }),
                createSection({
                    id: 'debug_settings',
                    header: 'Stored Settings',
                    rows: async () => {
                        const values = await Promise.all([
                            getLanguage(states),
                            getSorting(states),
                            getSearchSuffix(states),
                            getIncognito(states),
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
                            createLabel({
                                id: 'debug_settings_search_suffix',
                                label: 'Search suffix',
                                value: values[2],
                            }),
                            createLabel({
                                id: 'debug_settings_incognito',
                                label: 'Incognito',
                                value: `${values[3] ? 'yes' : 'no'}`,
                            }),
                            createLabel({
                                id: 'debug_settings_always_fallback',
                                label: 'Always fallback',
                                value: `${values[4] ? 'yes' : 'no'}`,
                            }),
                            createLabel({
                                id: 'debug_settings_collect_searches',
                                label: 'Collect searches',
                                value: `${values[5] ? 'yes' : 'no'}`,
                            }),
                            createMultilineLabel({
                                id: 'debug_settings_latest_search',
                                label: `Latest search${values[5] ? '' : ' (frozen)'}`,
                                value: `${values[6]}`,
                            }),
                            createButton({
                                id: 'debug_settings_clear_latest_search',
                                label: 'Clear latest search...',
                                value: '',
                                onTap: async () => {
                                    await setLatestSearch(states, null)
                                },
                            }),
                        ]
                    },
                }),
                createSection({
                    id: 'debug_search',
                    header: 'Searching',
                    footer: "Buttons suffixed with 'w/default' includes in-app settings.",
                    rows: async () => [
                        createNavigationButton({
                            id: 'debug_search_tests',
                            label: 'Search Tests',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_search_tests_data',
                                        header: 'Output',
                                        rows: async () => {
                                            let count = 0
                                            return await Promise.all(
                                                Data.debug.search.map(async (q) => {
                                                    const ctx = Search.create(q.input, q)
                                                    return createMultilineLabel({
                                                        id: `debug_search_tests_data_${count++}`,
                                                        label: `BookId: ${ctx.bookId ? 'yes' : 'no'}`,
                                                        value: `Sort by: ${ctx.sorting}\nOutput: ${ctx.text}`,
                                                    })
                                                }),
                                            )
                                        },
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_searchsettings_tests',
                            label: 'Search Tests w/default',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_searchsettings_tests_data',
                                        header: 'Output',
                                        rows: async () => {
                                            let count = 0
                                            return await Promise.all(
                                                Data.debug.search.map(async (q) => {
                                                    const ctx = await Search.createWithSettings(states, q.input, q)
                                                    return createMultilineLabel({
                                                        id: `debug_searchsettings_tests_data_${count++}`,
                                                        label: `BookId: ${ctx.bookId ? 'yes' : 'no'}`,
                                                        value: `Sort by: ${ctx.sorting}\nOutput: ${ctx.text}`,
                                                    })
                                                }),
                                            )
                                        },
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_subtitle_tests',
                            label: 'Subtitle Tests',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_subtitle_tests_data',
                                        header: 'Output',
                                        rows: async () => {
                                            let count = 0
                                            return await Promise.all(
                                                combos(LangDefs.getSourceCodes(true)).map(async (subs) => {
                                                    return createMultilineLabel({
                                                        id: `debug_subtitle_tests_data_${count++}`,
                                                        label: subs.length > 0 ? subs.join(', ') : 'none',
                                                        value: LangDefs.getSubtitle(subs),
                                                    })
                                                }),
                                            )
                                        },
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_languagebuild_tests',
                            label: 'Language Building',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_languagebuild_tests_data',
                                        header: 'Output',
                                        rows: async () => {
                                            let count = 0
                                            return await Promise.all(
                                                combos([
                                                    ...LangDefs.getSourceCodes(true),
                                                    ...LangDefs.getSourceCodes(true).map((a) => `-${a}`),
                                                ]).map(async (lang) => {
                                                    return createMultilineLabel({
                                                        id: `debug_languagebuild_tests_data_${count++}`,
                                                        label: lang.length > 0 ? lang.join(', ') : 'none',
                                                        value:
                                                            Search.create(undefined, {
                                                                languages: {
                                                                    include: lang.filter((a) => !a.startsWith('-')),
                                                                    exclude: lang
                                                                        .filter((a) => a.startsWith('-'))
                                                                        .map((a) => a.substring(1)),
                                                                },
                                                                empty: '<empty>',
                                                            }).text.replace('<empty>', '') ||
                                                            // prettier-ignore
                                                            `${lang.find((a) => a.startsWith('_')) != undefined ? '<Include All>' : '<none>'}`,
                                                    })
                                                }),
                                            )
                                        },
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_languagebuildsettings_tests',
                            label: 'Language Building w/default',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_languagebuildsettings_tests_data',
                                        header: 'Output',
                                        rows: async () => {
                                            let count = 0
                                            return await Promise.all(
                                                combos([
                                                    ...LangDefs.getSourceCodes(true),
                                                    ...LangDefs.getSourceCodes(true).map((a) => `-${a}`),
                                                ]).map(async (lang) => {
                                                    return createMultilineLabel({
                                                        id: `debug_languagebuildsettings_tests_data_${count++}`,
                                                        label: lang.length > 0 ? lang.join(', ') : 'none',
                                                        value:
                                                            // prettier-ignore
                                                            (await Search.createWithSettings(states, undefined, {
                                                                languages: {
                                                                    include: lang.filter((a) => !a.startsWith('-')),
                                                                    exclude: lang
                                                                        .filter((a) => a.startsWith('-'))
                                                                        .map((a) => a.substring(1)),
                                                                },
                                                                suffix: '',
                                                                empty: '<empty>',
                                                            })).text.replace('<empty>', '') ||
                                                            // prettier-ignore
                                                            `${lang.find((a) => a.startsWith('_')) != undefined ? '<Include All>' : '<none>'}`,
                                                    })
                                                }),
                                            )
                                        },
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
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
                        createNavigationButton({
                            id: 'debug_pkg_url',
                            label: 'Url Data',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_pkg_url_data',
                                        header: 'Definitions',
                                        rows: async () =>
                                            Object.entries(Data.nhentai.urls).map(([key, url]) => {
                                                return createMultilineLabel({
                                                    id: `debug_pkg_url_data_${key}`,
                                                    label: key,
                                                    value: url,
                                                })
                                            }),
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_pkg_path',
                            label: 'Path Data',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_pkg_path_data',
                                        header: 'Definitions',
                                        footer: "See 'Debug > Formatting' for formatted variants.",
                                        rows: async () =>
                                            Object.entries(Data.nhentai.paths).map(([key, path]) => {
                                                return createMultilineLabel({
                                                    id: `debug_pkg_path_data_${key}`,
                                                    label: key,
                                                    value: `Base: ${path.url}\nPath: ${path.path}`,
                                                })
                                            }),
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_pkg_language',
                            label: 'Language Data',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_pkg_language_data',
                                        header: 'Data',
                                        rows: async () =>
                                            LangDefs.data.map((def) => {
                                                return createMultilineLabel({
                                                    id: `debug_data_lang_def_${def.source}`,
                                                    label: `${def.name}`,
                                                    value: `Name: ${def.name}\nLocalized: ${def.localized}\nSource: ${
                                                        def.source
                                                    }\nInternal: ${def.internal}\nTagId: ${
                                                        def.tag ?? 'None'
                                                    }\nDefault: ${def.default ?? false}\nOrder: ${
                                                        def.order ?? Infinity
                                                    }`,
                                                })
                                            }),
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_pkg_sort',
                            label: 'Sorting Data',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_pkg_sort_data',
                                        header: 'Data',
                                        rows: async () =>
                                            SortDefs.data.map((def) => {
                                                return createMultilineLabel({
                                                    id: `debug_pkg_sort_data_${def.source}`,
                                                    label: def.name,
                                                    value: `Name: ${def.name}\nSource: ${def.source}\nDefault: ${
                                                        def.default ?? false
                                                    }\nOrder: ${def.order ?? Infinity}`,
                                                })
                                            }),
                                    }),
                                ],
                            }),
                        }),
                        createNavigationButton({
                            id: 'debug_pkg_debug',
                            label: 'Debug Data',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_pkg_debug_data_search',
                                        header: 'Search Data',
                                        rows: async () => {
                                            let idx = 0
                                            return Data.debug.search.map((search) => {
                                                return createMultilineLabel({
                                                    id: `debug_pkg_debug_data_search${idx++}`,
                                                    label: `${idx}`,
                                                    value: `Input: ${search.input}\nLanguages: ${JSON.stringify(
                                                        search.languages,
                                                    )}\nSorting: ${search.sorting}\nSuffix: ${search.suffix}`,
                                                })
                                            })
                                        },
                                    }),
                                    createSection({
                                        id: 'debug_pkg_debug_data_replace',
                                        header: 'Replacement Data',
                                        rows: async () =>
                                            Object.entries(Data.debug.replacements).map(([key, replace]) => {
                                                return createMultilineLabel({
                                                    id: `debug_pkg_debug_data_replace_${key}`,
                                                    label: key,
                                                    value: replace,
                                                })
                                            }),
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
                createSection({
                    id: 'debug_format',
                    header: 'Formatting',
                    rows: async () => [
                        createNavigationButton({
                            id: 'debug_format_path',
                            label: 'Formatted Path',
                            value: '',
                            form: createForm({
                                onSubmit: async () => undefined,
                                validate: async () => true,
                                sections: async () => [
                                    createSection({
                                        id: 'debug_format_path_data',
                                        header: 'Definitions',
                                        rows: async () =>
                                            Object.entries(Data.nhentai.paths).map(([key, path]) => {
                                                return createMultilineLabel({
                                                    id: `debug_format_path_data_${key}`,
                                                    label: key,
                                                    value: format(
                                                        `${
                                                            (Data.nhentai.urls as Record<string, string>)[path.url] ??
                                                            '_404_'
                                                        }${path.path}`,
                                                        Data.debug.replacements,
                                                    ),
                                                })
                                            }),
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
            ],
        }),
    })
