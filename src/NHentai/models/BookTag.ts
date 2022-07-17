export enum BookTagType {
    Artist = 'artist',
    Category = 'category',
    Character = 'character',
    Groups = 'groups',
    Language = 'language',
    Parody = 'parody',
    Tag = 'tag',
}

export interface BookTag {
    /**
     * The tag id
     */
    id: number
    /**
     * The type of the tag
     */
    type: BookTagType
    /**
     * The name of the tag
     */
    name: string
    /**
     * The amount of books the tag is used in
     */
    used: number
}
