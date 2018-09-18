import '../../stencil.core';
/**
 * @export
 * @class TranslateWord
 * Class representing the element that will be injected into webpages for translated words.
 * @property {string} value - The word that is being replaced
 * @property {string} translation - The word that will replace the old one.
 * @property {string} lang - 2 letter shortened language. IE: ES, EN, DE
 * @property {string} type - The type of word. IE: noun, verb, adverb, etc.
 * @property {boolean} singular - Indicates if the word is for singular or plural
 */
export declare class WordItem {
    value: string;
    translation: string;
    lang: string;
    type: string;
    singular: boolean;
    render(): JSX.Element;
}
