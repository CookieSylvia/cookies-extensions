import { LanguageCode } from 'paperback-extensions-common'

export const format = (source: string, replacements: Record<string, string>): string => {
    return source.replace(
        /{(\w+)}/g,
        (placeholderWithDelimiters, placeholderWithoutDelimiters: string) =>
            replacements[placeholderWithoutDelimiters] ?? placeholderWithDelimiters,
    )
}

export const SimpleIsoMappings: { [code: string]: LanguageCode } = {
    _unknown: LanguageCode.UNKNOWN,
    en: LanguageCode.ENGLISH,
    ja: LanguageCode.JAPANESE,
    zh: LanguageCode.CHINEESE,
}

export const LangLookup = (code?: string | null): LanguageCode => {
    if (code == undefined) {
        return LanguageCode.UNKNOWN
    }
    const lower = code.toLowerCase()
    return SimpleIsoMappings[lower] ?? LanguageCode.UNKNOWN
}

/**
 * iOS (& macOS?) does this magical thing called
 * smart punctuation, they cause errors &
 * users don't really expect it and don't check for it.
 * So we make sure to just replace them with
 * normal punctuation
 * @param smart Text that potentially contains smart quotes
 * @returns Text with smart quotes converted to normal quotes
 */
export const dumbify = (smart: string): string => {
    return smart.replace(/[“”‘’]/g, '"')
}

export const checkCloudflare = (status: number) => {
    if (status == 503) {
        throw new Error(
            "CLOUDFLARE BYPASS ERROR:\nPlease go to 'Settings > External Sources > nhentai' and press Cloudflare Bypass",
        )
    }
}
