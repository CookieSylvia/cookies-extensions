import { Data } from '../SourceData'

export interface Sorting {
    name: string
    source: string
    default?: boolean
    order?: number
}

export class SortingDefinitions {
    readonly data: Sorting[]

    constructor(data: Sorting[]) {
        this.data = data
    }

    getSourceCodes(sort = false): string[] {
        let sorting = this.data
        if (sort) {
            sorting = [...sorting].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
        }
        return sorting.map((sort) => sort.source)
    }

    getName(source: string): string {
        return this.data.find((sort) => sort.source == source)?.name ?? `Unknown '${source}'`
    }

    getDefault(): string {
        return this.data.find((sort) => sort.default)?.source ?? 'popular'
    }
}

export const SortDefs: SortingDefinitions = new SortingDefinitions(Data.nhentai.sorting)
