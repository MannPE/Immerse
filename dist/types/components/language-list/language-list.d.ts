import '../../stencil.core';
/**
 *
 * @export
 * @class TranslateFlagList
 * Element consisting of a list of language cards for choosing the current language.
 * @property {any} languages - The structure for this param is an array of custom objects with
 * the following propertis:
 * @property {string} name -The  simple language 2 letter name. IE: KR, DE, ES, etc.
 * @property {string} imgPath - path from src to the flag image.
 * @property {string} alt -The name of the language represented by the flag in case it doesn't load.
 *
 */
export declare class LanguageList {
    languages: {
        name: string;
        imgPath: string;
        alt: string;
    }[];
    render(): JSX.Element[];
}
