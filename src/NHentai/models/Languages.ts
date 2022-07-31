import { LanguageCode } from 'paperback-extensions-common'
import { Data } from '../Data'
import {
    orderedSort,
    orderedSortWith, 
} from '../Utils'

/**
 * The language definition.
 */
export interface Language {
    /**
     * The language's english name.
     */
    name: string
    /**
     * The language's name used by the source.\
     * Any source starting with '_' has a special meaning: Include All
     */
    source: string
    /**
     * The language's internal code.\
     * Is a raw value of {@link LanguageCode}
     */
    internal: string
    /**
     * The language's short name.\
     * E.g. English = EN
     */
    short?: string
    /**
     * The language's localized name.\
     * E.g. Japanese = 日本語
     */
    localized?: string
    /**
     * Wether this definition is the default one.
     */
    default?: boolean
    /**
     * The tag identifier used to determine the language
     * based on book tags, which is needed to find
     * the language of fallback searches.
     */
    tag?: number
    /**
     * The display order of this language.
     */
    order?: number
}

/**
 * A class for handling language definitions.
 */
export class LanguageDefinitions {
    /**
     * The contained language definitions.
     */
    readonly defs: Language[]
    /**
     * The language definitions sorted by their order.
     */
    readonly sorted: Language[]

    constructor(defs: Language[]) {
        this.defs = [...defs]
        this.sorted = orderedSort(defs)
    }

    /**
     * Creates an array containing all sources.
     * @param sort Wether to sort the sources first.
     * @returns An array of all sources.
     */
    getSources(sort = false): string[] {
        return (sort ? this.sorted : this.defs).map((lang) => lang.source)
    }

    /**
     * Tries to find the definition that the provided source belongs to.
     * @param source The source to search with.
     * @returns A copy of the language definition.
     */
    getDefinition(source: string | undefined): Language | undefined {
        const found = this.defs.find((lang) => lang.source === source)
        return found != undefined ? { ...found } : undefined
    }

    /**
     * Tries to find the source using the provided source.
     * @param source The source to find.
     * @returns The source, if found in any definition.
     */
    findSource(source: string | undefined): string | undefined {
        return this.getDefinition(source)?.source
    }

    /**
     * Filters the provided sources with known sources.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @param includeAll Wether to include sources starting with '_'
     * @returns A copy of provided sources filtered by all known sources.
     */
    getFilteredSources(sources: string[], sort = false, includeAll = true): string[] {
        const filtered = this.getSources(sort).filter((lang) => sources.includes(lang))
        return includeAll ? filtered : filtered.filter((lang) => !lang.startsWith('_'))
    }

    /**
     * Sorts the provided sources by their {@link Language.order}.
     * @param sources The provided sources.
     * @returns The sorted sources.
     */
    getSorted(sources: string[]): string[] {
        return orderedSortWith(sources, this.getOrder.bind(this))
    }

    /**
     * Tries to find all sources using the provided tag ids.
     * @param tagIds The provided tag ids.
     * @param sort Wether to sort the sources first.
     * @returns An array of found sources.
     */
    getSourcesFromTags(tagIds: (string | number)[], sort = false): string[] {
        return (sort ? this.sorted : this.defs)
            .filter((def) => tagIds.map((tags) => tags.toString()).includes(def.tag?.toString() ?? '-1'))
            .map((def) => def.source)
    }

    /**
     * Tries to find the source using the provided tag id.
     * @param tagId The provided tag id.
     * @returns The source found by using the tag id.
     */
    getSourceFromTag(tagId: string | number): string | undefined {
        return this.defs.find((lang) => lang.tag?.toString() === tagId)?.source
    }

    /**
     * Finds the default source.
     * @returns The default source.
     */
    getDefault(): string | undefined {
        return this.defs.find((lang) => lang.default)?.source
    }

    /**
     * Finds the source's name.
     * E.g. chinese = Chinese
     * @param source The source.
     * @returns The source's name.
     */
    // name -> Unknown '<source>'
    getName(source: string): string {
        return this.getDefinition(source)?.name ?? `Unknown '${source}'`
    }

    /**
     * Finds the source's short name.\
     * E.g. english = EN
     * @param source The source.
     * @returns The source's short name.
     */
    // short -> <source>[2,-2].upper()
    getShortName(source: string): string {
        return this.getDefinition(source)?.short ?? source.substring(2, -2).toUpperCase()
    }

    /**
     * Finds the source's localized name.\
     * E.g. japanese = 日本語
     * @param source The source.
     * @returns The source's localized name.
     */
    // localized -> name...
    getLocalizedName(source: string): string {
        return this.getDefinition(source)?.localized ?? this.getName(source)
    }

    /**
     * Finds the prioritized language code by using the source's order.
     * @param sources The provided sources.
     * @returns The prioritized language code by source order.
     */
    getPriorityLangCode(sources: string[]): LanguageCode {
        const sorted = this.getSorted(sources)
        return this.getLanguageCode(sorted[0] ?? '_all')
    }

    /**
     * Finds the source's language code.\
     * E.g. english = gb
     * @param source The source.
     * @returns The source's language code.
     */
    getLanguageCode(source: string): LanguageCode {
        // prettier-ignore
        return (this.getDefinition(source)?.internal as LanguageCode | undefined) ?? LanguageCode.UNKNOWN
    }

    /**
     * Finds the source's tag id.\
     * E.g. japanese = 6346
     * @param source The source.
     * @returns The source's tag id.
     */
    getTagId(source: string): number {
        return this.getDefinition(source)?.tag ?? -1
    }

    /**
     * Finds the source's display order.\
     * E.g. chinese = 3
     * @param source The source.
     * @returns The source's display order.
     */
    getOrder(source: string): number {
        return this.getDefinition(source)?.order ?? Infinity
    }

    /**
     * Combines the provided sources into a subtitle
     * displayed below covers when searching.
     * @param sources The provided sources.
     * @param sort Wether to sort the sources first.
     * @returns The source(s) combined into a subtitle.
     */
    getSubtitle(sources: string[], sort = true): string {
        const filtered = this.getFilteredSources(sources, sort)
        if (filtered.length <= 0) {
            return 'Unknown'
        }
        if (filtered.length === 1) {
            return this.getName(filtered[0] ?? 'Unknown')
        }
        return filtered.map((lang) => this.getShortName(lang)).join(', ')
    }

    /**
     * Emits a search string including or excluding all provided
     * sources, to combine include & exclude 2 strings should be
     * emitted and combined as `` `${include} ${exclude}`.trim()``
     * @param sources The provided sources.
     * @param exclude Wether the emited string is meant to exclude sources.
     * @returns A string including or excluding all provided sources.
     */
    emit(sources: string[], exclude: boolean): string {
        // If inclusive & Any string starting with '_'
        // is found, emit an empty string to include all.
        if (!exclude && sources.find((lang) => lang.startsWith('_')) != undefined) {
            return ''
        }
        // Emits all languages as either include or exclude.
        // (Include All is ignored for exclude, as excluding
        //  all doesn't make any sense)
        return this.getFilteredSources(sources, true, false)
            .map((lang) => `${exclude ? '-' : ''}language:${lang}`)
            .join(' ')
    }
}

export const LangDefs = new LanguageDefinitions(Data.nhentai.languages)
