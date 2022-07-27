import { LanguageCode } from 'paperback-extensions-common'
import { Data } from '../SourceData'
import {
    orderedSort,
    orderedSortWith, 
} from '../Utils'

export interface Language {
    name: string
    source: string
    /**
     * The raw value of {@link LanguageCode}
     */
    internal: string
    short?: string
    localized?: string
    default?: boolean
    /**
     * The tag id is used to determine the language
     * based on book tags, which is needed to
     * find the language of fallback searches
     */
    tag?: number
    order?: number
}

export class LanguageDefinitions {
    readonly data: Language[]
    readonly sorted: Language[]

    constructor(data: Language[]) {
        this.data = data
        this.sorted = orderedSort(data)
    }

    getSourceCodes(sort = false): string[] {
        return (sort ? this.sorted : this.data).map((lang) => lang.source)
    }

    getDefinition(source: string, sort = false): Language | undefined {
        return (sort ? this.sorted : this.data).find(lang => lang.source == source)
    }

    // name -> Unknown '<source>'
    getName(source: string): string {
        return this.getDefinition(source)?.name ?? `Unknown '${source}'`
    }

    // short -> <source>[2,-2].upper()
    getShortName(source: string): string {
        return this.getDefinition(source)?.short ?? source.substring(2, -2).toUpperCase()
    }

    //  0: Unknown
    //  1: English
    //  2: EN, JA
    //  3: EN, JA, ZH
    getSubtitle(sources: string[], sort = true): string {
        if (sources.length <= 0) {
            return 'Unknown'
        }
        if (sources.length === 1) {
            return this.getName(sources[0] ?? 'Unknown')
        }
        return (sort ? this.sorted : this.data)
            .filter((lang) => sources.includes(lang.source))
            .map((lang) => lang.short)
            .join(', ')
    }

    // localized -> name...
    getLocalizedName(source: string): string {
        return this.getDefinition(source)?.localized ?? this.getName(source)
    }

    getPriorityLangCode(sources: string[]): LanguageCode {
        const sorted = this.getSorted(sources)
        return this.getLanguageCode(sorted[0] ?? '_all')
    }

    getLanguageCode(source: string): LanguageCode {
        // prettier-ignore
        return (this.getDefinition(source)?.internal as LanguageCode | undefined) ?? LanguageCode.UNKNOWN
    }

    getTagId(source: string): number {
        return this.getDefinition(source)?.tag ?? -1
    }

    getFilteredSources(sources: string[], sort = false): string[] {
        return this.getSourceCodes(sort).filter(source => sources.includes(source))
    }

    getSorted(sources: string[]): string[] {
        return orderedSortWith(sources, (source) => this.getOrder(source))
    }

    getOrder(source: string): number {
        return this.getDefinition(source)?.order ?? Infinity
    }

    getSourcesFromTags(tagIds: string[] | number[], sort = false): string[] {
        const sources = tagIds
            .map((tagId) => this.getSourceFromTag(tagId))
            .filter((sources) => sources != undefined) as string[]

        return sort ? this.getSorted(sources) : sources
    }

    getSourceFromTag(tagId: string | number): string | undefined {
        return this.data.find((lang) => lang.tag == tagId)?.source
    }

    getDefault(): string {
        return this.data.find((lang) => lang.default)?.source ?? 'english'
    }
}

export const LangDefs: LanguageDefinitions = new LanguageDefinitions(Data.nhentai.languages)
