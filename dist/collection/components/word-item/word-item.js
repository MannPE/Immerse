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
export class WordItem {
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
    static get style() { return "/**style-placeholder:imr-word-item:**/"; }
}
