import { NHentaiInfo } from './NHentai'

/**
 * A simple string formatter, which replaces named {curly_braces}
 * with the given replacements.
 * @param source The source string.
 * @param replacements The replacements to use.
 * @returns The formatted string.
 */
export const format = (source: string, replacements: Record<string, string>): string => {
    return source.replace(
        /{(\w+)}/g,
        (placeholderWithDelimiters, placeholderWithoutDelimiters: string) =>
            replacements[placeholderWithoutDelimiters] ?? placeholderWithDelimiters,
    )
}

/**
 * An ordered object.
 */
export type Ordered = {
    order?: number
}

/**
 * Sorts a copy of the array by {@link Ordered.order} and returns the result.
 * @param sortable An array of ordered objects.
 * @returns The sorted result.
 */
export const orderedSort = <T extends Ordered>(sortable: T[]): T[] => {
    return [...sortable].sort((a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity))
}

/**
 * Sorts a copy of the array by the mapped order and returns the result.
 * @param sortable An array of objects that are to be ordered.
 * @param map The mapping to an order.
 * @returns The sorted result.
 */
export const orderedSortWith = <T>(sortable: T[], map: (value: T, index: number, array: T[]) => number): T[] => {
    const ordered = sortable.map((value, idx, arr) => {
        return {
            value: value,
            order: map(value, idx, arr),
        }
    })
    return orderedSort(ordered).map((order) => order.value)
}

/**
 * Ensures that the value is an array.
 * @param value An element or array.
 * @returns An ensured array.
 */
export const asArray = <T>(value?: T | T[]): T[] => {
    if (value == undefined) {
        return []
    }
    return Array.isArray(value) ? value : [value]
}

/**
 * iOS (& macOS?) does this magical thing called
 * smart punctuation, they cause errors &
 * users don't really expect it and don't check for it.
 * So we make sure to just replace them with
 * normal punctuation.
 * @param smart Text that potentially contains smart quotes.
 * @returns Text with smart quotes converted to normal quotes.
 */
export const dumbify = (smart: string): string => {
    return smart.replace(/[“”]/g, '"').replace(/‘’/g, "'")
}

/**
 * Checks wether we were stopped by Cloudflare.
 * And if so, give instructions to the user.
 * @param status The status code to check.
 */
export const checkCloudflare = (challenged: boolean) => {
    if (challenged) {
        throw new Error(`Cloudflare Challenge:\nPlease go to the homepage of ${NHentaiInfo.name} and press the cloud icon.`)
    }
}

import randUA from './lib/randua'

export const generateUA = () => {
    return randUA('desktop')
}
