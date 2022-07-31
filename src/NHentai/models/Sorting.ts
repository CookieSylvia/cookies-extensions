import { Data } from '../Data'
import {
    orderedSort,
    orderedSortWith, 
} from '../Utils'

/**
 * The sorting definition.
 */
export interface Sorting {
    /**
     * The sorting's name.
     */
    name: string
    /**
     * The sorting's name used by the source.
     */
    source: string
    /**
     * Wether this definition is the default one.
     */
    default?: boolean
    /**
     * The display order of this sorting.
     */
    order?: number
}

/**
 * A class for handling sorting definitions.
 */
export class SortingDefinitions {
    /**
     * The contained sorting definitions.
     */
    readonly defs: Sorting[]
    /**
     * The sorting definitions sorted by their order.
     */
    readonly sorted: Sorting[]

    constructor(defs: Sorting[] | Sorting[]) {
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
     * @returns A copy of the sorting definition.
     */
    getDefinition(source: string | undefined): Sorting | undefined {
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
     * @returns A copy of provided sources filtered by all known sources.
     */
    getFilteredSources(sources: string[], sort = false): string[] {
        return this.getSources(sort).filter((lang) => sources.includes(lang))
    }

    /**
     * Sorts the provided sources by their {@link Sorting.order}.
     * @param sources The provided sources.
     * @returns The sorted sources.
     */
    getSorted(sources: string[]): string[] {
        return orderedSortWith(sources, this.getOrder)
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
     * E.g. date = Recent
     * @param source The source.
     * @returns The source's name.
     */
    // name -> Unknown '<source>'
    getName(source: string): string {
        return this.getDefinition(source)?.name ?? `Unknown '${source}'`
    }

    /**
     * Finds the source's display order.\
     * E.g. popular = 1
     * @param source The source.
     * @returns The source's display order.
     */
    getOrder(source: string): number {
        return this.getDefinition(source)?.order ?? Infinity
    }
}

export const SortDefs = new SortingDefinitions(Data.nhentai.sorting)
