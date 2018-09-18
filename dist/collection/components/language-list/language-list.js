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
export class LanguageList {
    constructor() {
        this.languages = [
            {
                name: 'KR',
                imgPath: '/assets/img/flags/korean.png',
                alt: 'Hangeul_KR',
            },
            {
                name: 'DE',
                imgPath: '/assets/img/flags/german.png',
                alt: 'Deutsch_DE',
            },
            {
                name: 'FR',
                imgPath: '/assets/img/flags/french.png',
                alt: 'French_FR',
            },
            {
                name: 'ES',
                imgPath: '/assets/img/flags/spanish.png',
                alt: 'Spanish_MX',
            }
        ];
    }
    render() {
        return (this.languages.map(demo => h("imr-language-card", { name: demo.name, imgPath: demo.imgPath, alt: demo.alt })));
    }
    static get is() { return "imr-language-list"; }
    static get style() { return "/**style-placeholder:imr-language-list:**/"; }
}
