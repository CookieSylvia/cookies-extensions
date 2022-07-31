import { SourceStateManager } from 'paperback-extensions-common'
import {
    LangDefs,
    SortDefs, 
} from '../models'
import {
    getDoubleSearch,
    getIncognito,
    getLanguage,
    getSearchSuffix,
    getSorting,
    setDoubleSearch,
    setIncognito,
    setLanguage,
    setSearchSuffix,
    setSorting,
} from '../Settings'
import { dumbify } from '../Utils'

export const settingsNavButton = (states: SourceStateManager) =>
    createNavigationButton({
        id: 'settings',
        label: 'Settings',
        value: '',
        form: settingsForm(states),
    })

export type ContentValues = {
    language: [string]
    sorting: [string]
    search_suffix: string
}

export type WebValues = {
    incognito: boolean
    double_search: boolean
}

export const settingsForm = (states: SourceStateManager, readonly = false) =>
    createForm({
        onSubmit: async (values: ContentValues & WebValues) => {
            if (readonly) {
                return
            }
            await Promise.all([settingsSubmit(states, values), webSubmit(states, values)])
        },
        validate: async () => true,
        sections: async () => [settingsSection(states), webSection(states)],
    })

export const settingsSubmit = async (states: SourceStateManager, values: ContentValues) => {
    await Promise.all([
        setLanguage(states, values.language[0]),
        setSorting(states, values.sorting[0]),
        setSearchSuffix(states, dumbify(values.search_suffix)),
    ])
}

export const webSubmit = async (states: SourceStateManager, values: WebValues) => {
    await Promise.all([
        setIncognito(states, values.incognito),
        setDoubleSearch(states, values.double_search),
    ])
}

export const settingsSection = (states: SourceStateManager) =>
    createSection({
        id: 'settings_content',
        header: 'nhentai',
        footer: 'Modify the nhentai experience to your liking.',
        rows: async () => {
            const values = await Promise.all([getLanguage(states), getSorting(states), getSearchSuffix(states)])
            return [
                createSelect({
                    id: 'language',
                    label: 'Language',
                    options: LangDefs.getSources(true),
                    displayLabel: (option) => LangDefs.getLocalizedName(option),
                    value: [values[0]],
                    allowsMultiselect: false,
                    minimumOptionCount: 1,
                }),
                createSelect({
                    id: 'sorting',
                    label: 'Sort by',
                    options: SortDefs.getSources(true),
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
    })

export const webSection = (states: SourceStateManager) =>
    createSection({
        id: 'web',
        header: 'Web Requests',
        footer: 'Double search requests two pages per search. Enable this if your searches stops loading after 1 page.',
        rows: async () => {
            const values = await Promise.all([getIncognito(states), getDoubleSearch(states)])
            return [
                createSwitch({
                    id: 'incognito',
                    label: 'Incognito',
                    value: values[0],
                }),
                createSwitch({
                    id: 'double_search',
                    label: 'Double search (Slower)',
                    value: values[1],
                }),
            ]
        },
    })
