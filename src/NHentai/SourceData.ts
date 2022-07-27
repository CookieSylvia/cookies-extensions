import * as nhentaiData from './data/nhentai.json'
import * as debugData from './data/debug.json'
import { SearchOptions } from './models'

export interface DebugData {
    search: (SearchOptions & { input?: string })[]
    replacements: { [key: string]: string }
}

export const Data = {
    nhentai: nhentaiData,
    debug: debugData as DebugData,
}
