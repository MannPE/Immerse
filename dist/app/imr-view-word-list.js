/*! Built with http://stenciljs.com */
const { h } = window.App;

class ViewWordList {
    constructor() {
        this.words = [
            {
                value: "cat",
                translation: "Katze",
                lang: "de",
                type: "noun",
                singular: true
            },
            {
                value: "dog",
                translation: "Hund",
                lang: "de",
                type: "noun",
                singular: true
            },
            {
                value: "dog",
                translation: "Hund",
                lang: "de",
                type: "noun",
                singular: true
            },
            {
                value: "jump",
                translation: "도역",
                lang: "kr",
                type: "verb",
                singular: true
            }
        ];
    }
    render() {
        return [
            this.words.map(word => (h("imr-word-item", { value: word.value, translation: word.translation, lang: word.lang, type: word.type, singular: word.singular })))
        ];
    }
    static get is() { return "imr-view-word-list"; }
    static get style() { return "imr-view-word-list {\n  -ms-flex-line-pack: center;\n  align-content: center;\n  display: grid;\n  grid-auto-rows: auto;\n  grid-template-columns: repeat(auto-fill, 1fr);\n  grid-gap: 2em; }\n  imr-view-word-list .noun {\n    color: #107896; }\n  imr-view-word-list .verb {\n    color: #829356; }\n  imr-view-word-list imr-word-item {\n    padding-bottom: 5px;\n    border-bottom: 1px solid gray; }"; }
}

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
class WordItem {
    render() {
        return [
            h("span", { class: `${this.type} ${(this.singular ? "singular" : "plural")}` }, this.value),
            h("input", { type: "text", value: this.translation }),
            h("a", { rel: "noopener", class: "svg-button", title: "Remove this word from the immerse list" },
                h("app-icon", { name: "trash" }))
        ];
    }
    static get is() { return "imr-word-item"; }
    static get properties() { return {
        "lang": {
            "type": String,
            "attr": "lang"
        },
        "singular": {
            "type": Boolean,
            "attr": "singular"
        },
        "translation": {
            "type": String,
            "attr": "translation"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get style() { return "imr-word-item {\n  font-size: 1.5em;\n  width: 100%; }"; }
}

export { ViewWordList as ImrViewWordList, WordItem as ImrWordItem };
