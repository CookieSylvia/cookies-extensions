import { LanguageCode } from 'paperback-extensions-common'
import { Data } from '../SourceData'
import { LangLookup } from '../Utils'

export interface Language {
    name: string
    localized: string
    source: string
    internal: string
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

    constructor(data: Language[]) {
        this.data = data
    }

    getSourceCodes(sort = false): string[] {
        let language = this.data
        if (sort) {
            language = [...language].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
        }
        return language.map((lang) => lang.source)
    }

    getName(source: string): string {
        return this.data.find((lang) => lang.source == source)?.name ?? `Unknown '${source}'`
    }

    getLocalizedName(source: string): string {
        return this.data.find((lang) => lang.source == source)?.localized ?? `Unknown '${source}'`
    }

    getInternalCode(source: string): LanguageCode {
        return LangLookup(this.data.find((lang) => lang.source == source)?.internal)
    }

    getTagId(source: string): number {
        return this.data.find((lang) => lang.source == source)?.tag ?? -1
    }

    getSourceFromTag(tagId: string | number): string | undefined {
        return this.data.find((lang) => lang.tag == tagId)?.source
    }

    getDefault(): string {
        return this.data.find((lang) => lang.default)?.source ?? 'english'
    }
}

export const LangDefs: LanguageDefinitions = new LanguageDefinitions(Data.nhentai.languages)
