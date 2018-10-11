/*! Built with http://stenciljs.com */
const { h } = window.App;

class ViewWordList {
    componentWillLoad() {
        console.log("Will load");
        chrome.storage.sync.get(['imrkorean'], (result) => {
            this.setWords(result['imrkorean']);
            console.log("words loaded into wordlist", this.words);
        });
    }
    loadWords() {
        console.log(this.words);
    }
    setWords(any) {
        this.words = any;
        console.log("setting words", any, this.words);
    }
    render() {
        console.log("rendered", this.words);
        if (this.words) {
            let wordItems = [];
            for (var key in this.words) {
                let word = this.words[key];
                console.log(word);
                wordItems.push(h("imr-word-item", { value: word.value, translation: word.translation, insensitive: word.insensitive, ignoreWhiteSpace: word.ignoreWhiteSpace }));
            }
            return wordItems;
        }
        else
            return h("div", null, "NO WORDS");
    }
    static get is() { return "imr-view-word-list"; }
    static get properties() { return {
        "_el": {
            "elementRef": true
        },
        "loadWords": {
            "method": true
        },
        "setWords": {
            "method": true
        },
        "words": {
            "state": true
        }
    }; }
    static get style() { return "imr-view-word-list {\n  -ms-flex-line-pack: center;\n  align-content: center;\n  display: grid;\n  grid-auto-rows: auto;\n  grid-template-columns: repeat(1, 1fr);\n  grid-gap: 2em; }\n  imr-view-word-list .noun {\n    color: #107896; }\n  imr-view-word-list .verb {\n    color: #829356; }\n  imr-view-word-list imr-word-item {\n    padding-bottom: 5px;\n    border-bottom: 1px solid gray;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex; }\n    imr-view-word-list imr-word-item span {\n      width: 50%; }\n    imr-view-word-list imr-word-item input {\n      width: 30%; }\n    imr-view-word-list imr-word-item a {\n      width: 7%; }"; }
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
    removeItem() {
        console.log("REMOVING ^");
        chrome.storage.sync.get(['imrkorean'], (result) => {
            console.log(`found our word`);
            let newItems = result['imrkorean'];
            delete newItems[this.value];
            console.log("gonna sync now");
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
    static get style() { return "imr-word-item {\n  font-size: 1.5em;\n  width: 100%; }"; }
}

export { ViewWordList as ImrViewWordList, WordItem as ImrWordItem };
