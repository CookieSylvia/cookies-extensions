import {
    Language,
    Search,
    SearchContext,
    SearchOptions,
    Sorting, 
} from './models'
import { SearchHistoryEntry } from './Settings'

const dedent = (str: string, preserveEmpty = false) => str.replace(preserveEmpty ? /\n[^\S\r\n]*/g : /\n\s*/g, '\n')

export const stringifyLanguage = (language: Language): string => {
    return dedent(
        `
    Name: ${language.name}
    Short: ${language.short}
    Localized: ${language.localized}
    Source: ${language.source}
    TagId: ${language.tag ?? 'none'}
    Order: ${language.order ?? Infinity}
    Default: ${yesno(language.default ?? false)}
    `.trim(),
    )
}

export const stringifySorting = (sorting: Sorting): string => {
    return dedent(
        `
    Name: ${sorting.name}
    Source: ${sorting.source}
    Order: ${sorting.order ?? Infinity}
    Default: ${yesno(sorting.default ?? false)}
    `.trim(),
    )
}

export const stringifySearchOptions = (options?: SearchOptions & { text?: string }): string => {
    const langCtx = Search.createLanguageContext(options?.languages)
    const incl = langCtx.include
    const excl = langCtx.exclude
    return dedent(
        `
    Text: ${options?.text ?? '<none>'}
    Sort: ${options?.sort ?? '<none>'}
    Suffix: ${options?.suffix ?? '<none>'}
    Included Languages: [${incl.join(', ')}]
    Excluded Languages: [${excl.join(', ')}]
    `.trim(),
    )
}

export const stringifySearchEntry = (entry: SearchHistoryEntry): string => {
    return dedent(
        `
    Text: ${entry.text}
    Sort: ${entry.sort ?? 'unknown'}
    Status: ${entry.status ?? 'unknown'}
    Skipped: ${yesno(entry.skipped ?? false)}
    Stopped: ${yesno(entry.stopped ?? false)}
    Should stop: ${yesno(entry.shouldStop ?? false)}
    Reason: ${entry.reason ?? '<none>'}
    Fallback: ${yesno(entry.fallback ?? false)}
    Next: ${entry.nextPage ?? 'unknown'}
    Max: ${entry.maxPage ?? 'unknown'}
    `.trim(),
    )
}

export const stringifySearchContext = (context: SearchContext): string => {
    return dedent(
        `
    Text: ${context.text}
    Sort: ${context.sort ?? '<omit>'}
    BookId: ${yesno(context.bookId ?? false)}
    `.trim(),
    )
}

/**
 * Appends ' (frozen)' to the label if it's considered frozen.
 * @param label The label to use.
 * @param frozen Wether the state is frozen.
 * @returns The label appended by (frozen) if frozen.
 */
export const showFrozen = (label: string, frozen: boolean) => `${label}${frozen ? ' (frozen)' : ''}`

/**
 * Stringifies a boolean into a yes/no string.
 * @param bool The boolean to use.
 * @returns Yes or no depending on the bool.
 */
export const yesno = (bool: boolean): string => (bool ? 'yes' : 'no')

/**
 * Returns every unique array combination.
 * @param arr The array to create combinations of.
 * @param minLength The minimum length of a combination.
 * @returns An array of the combinations.
 */
export const combos = <T>(arr: readonly T[], minLength = 0): T[][] => {
    // Wtf even is this... but it works.
    // https://stackoverflow.com/a/42531964
    const combinations = new Array(1 << arr.length).fill(undefined).map((_, i) => arr.filter((_, j) => i & (1 << j)))
    return combinations.filter((a) => a.length >= minLength)
}
