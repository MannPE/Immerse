/*! Built with http://stenciljs.com */
App.loadBundle('imr-view-word-list', ['exports'], function (exports) {
    var h = window.App.h;
    var ViewWordList = /** @class */ (function () {
        function ViewWordList() {
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
        ViewWordList.prototype.render = function () {
            return [
                this.words.map(function (word) { return (h("imr-word-item", { value: word.value, translation: word.translation, lang: word.lang, type: word.type, singular: word.singular })); })
            ];
        };
        Object.defineProperty(ViewWordList, "is", {
            get: function () { return "imr-view-word-list"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWordList, "style", {
            get: function () { return "imr-view-word-list {\n  -ms-flex-line-pack: center;\n  align-content: center;\n  display: grid;\n  grid-auto-rows: auto;\n  grid-template-columns: repeat(auto-fill, 1fr); }"; },
            enumerable: true,
            configurable: true
        });
        return ViewWordList;
    }());
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
    var WordItem = /** @class */ (function () {
        function WordItem() {
        }
        WordItem.prototype.render = function () {
            return [
                h("span", { class: this.type + " " + (this.singular ? "singular" : "plural") }, this.value),
                h("input", { type: "text", value: this.translation }),
                h("a", { rel: "noopener", class: "svg-button", title: "Remove this word from the immerse list" }, h("app-icon", { name: "trash" }))
            ];
        };
        Object.defineProperty(WordItem, "is", {
            get: function () { return "imr-word-item"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordItem, "properties", {
            get: function () {
                return {
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
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordItem, "style", {
            get: function () { return "imr-word-item {\n  font-size: 1.5em; }"; },
            enumerable: true,
            configurable: true
        });
        return WordItem;
    }());
    exports.ImrViewWordList = ViewWordList;
    exports.ImrWordItem = WordItem;
    Object.defineProperty(exports, '__esModule', { value: true });
});
