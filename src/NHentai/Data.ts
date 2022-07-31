import * as nhentaiData from './data/nhentai.json'
import * as debugData from './data/debug.json'
import { SearchOptions } from './models'

export interface DebugData {
    search: (SearchOptions & { text?: string })[]
    replacements: { [key: string]: string }
}

export const Data = {
    nhentai: nhentaiData as typeof nhentaiData,
    debug: debugData as DebugData,
}
