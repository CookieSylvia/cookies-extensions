export const format = (source: string, replacements: Record<string, string>): string => {
    return source.replace(
        /{(\w+)}/g,
        (placeholderWithDelimiters, placeholderWithoutDelimiters: string) =>
            replacements[placeholderWithoutDelimiters] ?? placeholderWithDelimiters,
    )
}

export type Ordered = {
    order?: number
}

export const orderedSort = <T extends Ordered>(sortable: T[]): T[] => {
    return [...sortable].sort((a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity))
}

export const orderedSortWith = <T>(sortable: T[], map: (value: T, index: number, array: T[]) => number): T[] => {
    const ordered = sortable.map((value, idx, arr) => {
        return {
            value: value,
            order: map(value, idx, arr),
        }
    })
    return orderedSort(ordered).map((order) => order.value)
}

export const combos = <T>(arr: T[], minLength = 0): T[][] => {
    // Wtf even is this... but it works.
    // https://stackoverflow.com/a/42531964
    const combinations = new Array(1 << arr.length).fill(undefined).map((_, i) => arr.filter((_, j) => i & (1 << j)))
    return combinations.filter((a) => a.length >= minLength)
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
