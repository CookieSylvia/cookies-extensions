import { Data } from '../SourceData'
import { orderedSort } from '../Utils'

export interface Sorting {
    name: string
    source: string
    default?: boolean
    order?: number
}

export class SortingDefinitions {
    readonly data: Sorting[]
    readonly sorted: Sorting[]

    constructor(data: Sorting[]) {
        this.data = data
        this.sorted = orderedSort(data)
    }

    getSourceCodes(sort = false): string[] {
        return (sort ? this.sorted : this.data).map((sort) => sort.source)
    }

    find(source: string | undefined): string | undefined {
        return this.data.find(sort => sort.source == source)?.source
    }

    getName(source: string): string {
        return this.data.find((sort) => sort.source == source)?.name ?? `Unknown '${source}'`
    }

    getDefault(): string {
        return this.data.find((sort) => sort.default)?.source ?? 'popular'
    }
}

export const SortDefs: SortingDefinitions = new SortingDefinitions(Data.nhentai.sorting)
