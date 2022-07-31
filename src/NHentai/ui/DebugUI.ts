import {
    Section,
    SourceStateManager, 
} from 'paperback-extensions-common'
import {
    getAlwaysFallback,
    getCollectSearches,
    setAlwaysFallback,
    setCollectSearches, 
} from '../Settings'
import { packagedDataSection } from './DebugDataUI'
import { formattedDataSection } from './DebugFormatUI'
import { debugTestsSection } from './DebugSearchUI'
import { storedSettingsSection } from './DebugSettingsUI'

export const debugNavButton = (states: SourceStateManager) =>
    createNavigationButton({
        id: 'debug',
        label: 'Debug',
        value: '',
        form: debugForm(states),
    })

export const debugForm = (states: SourceStateManager, readonly = false) =>
    createForm({
        onSubmit: async (values: DebugOverviewValues) => (readonly ? undefined : await overviewSubmit(states, values)),
        validate: async (): Promise<boolean> => true,
        sections: async () => [
            overviewSection(states),
            storedSettingsSection(states),
            debugTestsSection(states),
            packagedDataSection(),
            formattedDataSection(),
        ],
    })

export type DebugOverviewValues = {
    collect_searches: boolean
    always_fallback: boolean
}

export const overviewSubmit = async (states: SourceStateManager, values: DebugOverviewValues) => {
    await Promise.all([
        setCollectSearches(states, values.collect_searches),
        setAlwaysFallback(states, values.always_fallback),
    ])
}

export const overviewSection = (states: SourceStateManager) =>
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
    })

export const createNavSections = (navSection: { id: string; label: string; sections: () => Promise<Section[]> }) =>
    createNavigationButton({
        id: navSection.id,
        label: navSection.label,
        value: '',
        form: createForm({
            onSubmit: async () => undefined,
            validate: async () => true,
            sections: navSection.sections,
        }),
    })
