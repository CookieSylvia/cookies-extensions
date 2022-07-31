import { SourceStateManager } from 'paperback-extensions-common'
import { Data } from '../Data'
import {
    combos,
    stringifySearchContext, 
} from '../Debug'
import {
    LangDefs,
    Search, 
} from '../models'
import { createNavSections } from './DebugUI'

export const debugTestsSection = (states: SourceStateManager) =>
    createSection({
        id: 'debug_search',
        header: 'Searching',
        footer: "Buttons suffixed with 'w/Settings' includes in-app settings.",
        rows: async () => [
            searchTestsNavButton(),
            searchTestsNavButton(states),
            subtitleTestsNavButton(),
            langaugeTestsNavButton(),
            langaugeTestsNavButton(states),
        ],
    })

export const searchTestsNavButton = (states?: SourceStateManager) => {
    const id = `debug_tests_search${states != undefined ? '_settings' : ''}`
    return createNavSections({
        id: id,
        label: `Search tests${states != undefined ? ' w/Settings' : ''}`,
        sections: async () => [searchTestsSection(states)],
    })
}

export const subtitleTestsNavButton = () =>
    createNavSections({
        id: 'debug_tests_subtitle',
        label: 'Subtitle tests',
        sections: async () => [subtitleTestsSection()],
    })

export const langaugeTestsNavButton = (states?: SourceStateManager) => {
    const id = `debug_tests_language${states != undefined ? '_settings' : ''}`
    return createNavSections({
        id: id,
        label: `Language emit${states != undefined ? ' w/Settings' : ''}`,
        sections: async () => [langaugeTestsSection(states)],
    })
}

export const searchTestsSection = (states?: SourceStateManager) => {
    const id = `debug_tests_search${states != undefined ? '_settings' : ''}`
    return createSection({
        id: `${id}_data`,
        header: 'Output',
        rows: async () =>
            await Promise.all(
                Data.debug.search.map(async (search, idx) => {
                    const ctx = await Search.createWithSettings(states, search.text, search)
                    return createMultilineLabel({
                        id: `${id}_data[${idx}]`,
                        label: `Search #${idx}`,
                        value: stringifySearchContext(ctx),
                    })
                }),
            ),
    })
}

export const subtitleTestsSection = () =>
    createSection({
        id: 'debug_tests_subtitle_data',
        header: 'Output',
        rows: async () =>
            await Promise.all(
                combos(LangDefs.getSources(true)).map(async (subs, idx) => {
                    return createMultilineLabel({
                        id: `debug_tests_subtitle_data[${idx}]`,
                        label: subs.length > 0 ? subs.join(', ') : 'none',
                        value: LangDefs.getSubtitle(subs),
                    })
                }),
            ),
    })

export const langaugeTestsSection = (states?: SourceStateManager) => {
    const id = `debug_tests_language${states != undefined ? '_settings' : ''}`
    return createSection({
        id: `${id}_data`,
        header: 'Output',
        rows: async () =>
            await Promise.all(
                // prettier-ignore
                combos([
                    ...LangDefs.getSources(true),
                    ...LangDefs.getSources(true).map((a) => `-${a}`),
                ]).map(async (langs, idx) => {
                    const include = langs.filter((a) => !a.startsWith('-'))
                    const exclude = langs.filter((a) => a.startsWith('-')).map((a) => a.substring(1))
                    const all = include.find((a) => a.startsWith('_')) != undefined
                    const emitted = await Search.emitLanguagesWithSettings({ include, exclude }, states)
                    return createMultilineLabel({
                        id: `${id}_data[${idx}]`,
                        label: langs.length > 0 ? langs.join(', ') : 'none',
                        value: emitted || (all ? '<Include All>' : '<none>'),
                    })
                }),
            ),
    })
}
