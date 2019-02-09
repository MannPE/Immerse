export interface ImmerseWord {
    value: string;
    translation: string;
    caseSensitive: boolean;
    ignoreWhiteSpace: boolean;
    altText?: string;
}

export type LanguageString = "imrkorean" | "imrjapanese" | "imrthai";