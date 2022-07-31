import { Data } from '../Data'
import { format } from '../Utils'
import { createNavSections } from './DebugUI'

export const formattedDataSection = () =>
    createSection({
        id: 'debug_format',
        header: 'Formatting',
        rows: async () => [formattedPathNavButton()],
    })

const formattedPathNavButton = () =>
    createNavSections({
        id: 'debug_format_path',
        label: 'Formatted Path',
        sections: async () => [formattedPathSection()],
    })

const formattedPathSection = () =>
    createSection({
        id: 'debug_format_path_data',
        header: 'Definitions',
        rows: async () =>
            Object.entries(Data.nhentai.paths).map(([key, path]) => {
                return createMultilineLabel({
                    id: `debug_format_path_data[${key}]`,
                    label: key,
                    value: format(
                        `${(Data.nhentai.urls as Record<string, string>)[path.url] ?? '_404_'}${path.path}`,
                        Data.debug.replacements,
                    ),
                })
            }),
    })
