/*! Built with http://stenciljs.com */
const { h } = window.App;

/**
 *
 *
 * @export
 * @class LanguageCard
 */
class LanguageCard {
    render() {
        return [
            h("img", { src: `${this.imgPath}`, srcSet: `${this.imgPath} 1x, ${this.imgPath}@2x 2x`, alt: this.alt }),
            h("p", null, this.name)
        ];
    }
    static get is() { return "imr-language-card"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "imgPath": {
            "type": String,
            "attr": "img-path"
        },
        "name": {
            "type": String,
            "attr": "name"
        }
    }; }
    static get style() { return ""; }
}

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
class LanguageList {
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
    static get style() { return "imr-language-list {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-gap: 10px;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  imr-language-list imr-language-card {\n    padding-bottom: 1em;\n    cursor: pointer; }\n    imr-language-list imr-language-card h4 {\n      margin-bottom: 0; }\n    imr-language-list imr-language-card p {\n      margin-top: .5em;\n      margin-bottom: 0;\n      line-height: 1.5; }\n    imr-language-list imr-language-card img {\n      width: 100%; }\n      imr-language-list imr-language-card img:hover {\n        border: 1px solid #dadada;\n        border-radius: 4px;\n        outline: none;\n        -webkit-box-shadow: 0 0 2em #9ecaed;\n        box-shadow: 0 0 2em #9ecaed; }"; }
}

export { LanguageCard as ImrLanguageCard, LanguageList as ImrLanguageList };
