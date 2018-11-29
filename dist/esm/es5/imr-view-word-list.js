/*! Built with http://stenciljs.com */
import { h } from './app.core.js';
var ViewWordList = /** @class */ (function () {
    function ViewWordList() {
    }
    ViewWordList.prototype.componentWillLoad = function () {
        var _this = this;
        console.log("Will load");
        chrome.storage.sync.get(['imrkorean'], function (result) {
            _this.setWords(result['imrkorean']);
            console.log("words loaded into wordlist", _this.words);
        });
    };
    ViewWordList.prototype.loadWords = function () {
        console.log(this.words);
    };
    ViewWordList.prototype.setWords = function (any) {
        var filtered = any.filter(function (el) {
            return el != null;
        });
        this.words = filtered;
        console.log("setting words", any, this.words);
    };
    ViewWordList.prototype.render = function () {
        if (this.words) {
            var wordItems = [];
            for (var key in this.words) {
                var word = this.words[key];
                wordItems.push(h("imr-word-item", { value: word.value, translation: word.translation, insensitive: word.caseSensitive, ignoreWhiteSpace: word.ignoreWhiteSpace }));
            }
            return wordItems;
        }
        else
            return h("div", null, "NO WORDS");
    };
    Object.defineProperty(ViewWordList, "is", {
        get: function () { return "imr-view-word-list"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWordList, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWordList, "style", {
        get: function () { return "imr-view-word-list {\n  -ms-flex-line-pack: center;\n  align-content: center;\n  display: grid;\n  grid-auto-rows: auto;\n  grid-template-columns: repeat(1, 1fr);\n  grid-gap: 2em; }\n  imr-view-word-list .noun {\n    color: #107896; }\n  imr-view-word-list .verb {\n    color: #829356; }\n  imr-view-word-list imr-word-item {\n    padding-bottom: 5px;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    line-height: 1em;\n    white-space: nowrap; }\n    imr-view-word-list imr-word-item span {\n      overflow-x: auto;\n      width: 50%; }\n    imr-view-word-list imr-word-item input {\n      width: 30%; }\n    imr-view-word-list imr-word-item a {\n      width: 7%; }"; },
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
    WordItem.prototype.removeItem = function () {
        var _this = this;
        console.log("REMOVING ^");
        chrome.storage.sync.get(['imrkorean'], function (result) {
            var newItems = result['imrkorean'];
            var index = 0;
            for (; index < newItems.length; index++) {
                var element = newItems[index];
                if (element.value == _this.value)
                    break;
            }
            console.log("removing item in position:", index, newItems[index]);
            newItems.splice(index, 1);
            console.log("gonna sync now, with new items", newItems);
            chrome.storage.sync.set({ 'imrkorean': newItems }), function () {
            };
            _this._el.parentElement.setWords(newItems);
        });
    };
    WordItem.prototype.render = function () {
        var _this = this;
        var trashstyle = { color: "red" };
        var checkstyle = { color: "green" };
        return [
            h("span", { class: this.type + " " + (this.singular ? "singular" : "plural") }, this.value),
            h("input", { type: "text", value: this.translation }),
            h("a", { onClick: function () { return _this.removeItem(); } }, h("i", { class: "far fa-trash-alt", style: trashstyle })),
            h("a", null, h("i", { class: "far fa-check-circle", style: checkstyle }))
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordItem, "style", {
        get: function () { return "imr-word-item {\n  font-size: 1.5em;\n  width: 100%; }\n  imr-word-item a:hover {\n    cursor: pointer; }\n  imr-word-item .far {\n    opacity: 0.4; }\n    imr-word-item .far:hover {\n      opacity: 1; }"; },
        enumerable: true,
        configurable: true
    });
    return WordItem;
}());
export { ViewWordList as ImrViewWordList, WordItem as ImrWordItem };
