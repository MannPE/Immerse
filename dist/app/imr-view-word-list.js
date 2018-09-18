/*! Built with http://stenciljs.com */
const { h } = window.App;

class ViewWordList {
    constructor() {
        this.words = [
            {
                "value": "cat",
                "translation": "Katze",
                "lang": "en",
                "type": "noun",
                "singular": true
            },
            {
                "value": "dog",
                "translation": "Hund",
                "lang": "en",
                "type": "noun",
                "singular": true
            }
        ];
    }
    render() {
        return (h("div", null, this.words.map(word => (h("imr-word-item", { value: word.value, translation: word.translation, lang: word.lang, type: word.type, singular: word.singular })))));
    }
    static get is() { return "imr-view-word-list"; }
    static get style() { return "notfound-page {\n  text-align: center; }"; }
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
        return (h("div", null,
            h("span", { class: this.type + " word " + (this.singular ? "singular" : "plural") }, this.value),
            h("input", { type: "text", value: this.translation }),
            h("a", { rel: "noopener", class: "svg-button", title: "Remove this word from the immerse list" },
                h("app-icon", { name: "trash" }))));
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
    static get style() { return ""; }
}

export { ViewWordList as ImrViewWordList, WordItem as ImrWordItem };
