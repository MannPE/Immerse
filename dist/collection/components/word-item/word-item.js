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
    removeItem() {
        console.log("REMOVING ^");
        chrome.storage.sync.get(['imrkorean'], (result) => {
            let newItems = result['imrkorean'];
            let index = 0;
            for (; index < newItems.length; index++) {
                const element = newItems[index];
                if (element.value == this.value)
                    break;
            }
            console.log("removing item in position:", index, newItems[index]);
            delete newItems[index];
            console.log("gonna sync now, with new items", newItems);
            chrome.storage.sync.set({ 'imrkorean': newItems }), function () {
                console.log("deleting this");
            };
            this._el.parentElement.setWords(newItems);
        });
    }
    render() {
        var trashstyle = { color: "red" };
        var checkstyle = { color: "green" };
        return [
            h("span", { class: `${this.type} ${(this.singular ? "singular" : "plural")}` }, this.value),
            h("input", { type: "text", value: this.translation }),
            h("a", { onClick: () => this.removeItem() },
                h("i", { class: "far fa-trash-alt", style: trashstyle })),
            h("a", null,
                h("i", { class: "far fa-check-circle", style: checkstyle }))
        ];
    }
    static get is() { return "imr-word-item"; }
    static get properties() { return {
        "_el": {
            "elementRef": true
        },
        "ignoreWhiteSpace": {
            "type": Boolean,
            "attr": "ignore-white-space"
        },
        "insensitive": {
            "type": Boolean,
            "attr": "insensitive"
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
