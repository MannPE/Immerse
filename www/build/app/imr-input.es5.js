/*! Built with http://stenciljs.com */
App.loadBundle('imr-input', ['exports'], function (exports) {
    var h = window.App.h;
    /**
     *
     * @export
     * @class TranslateInput
     * Represents a custom input that includes a title and placeholder.
     * @property {string} word - the value inside of the input.
     * @property {string} description - This will be the title of such input.
     * @property {string} example - The placeholder inside of the input.
     */
    var Input = /** @class */ (function () {
        function Input() {
        }
        Input.prototype.render = function () {
            console.log("RENDERING INPUT", this.word);
            return (h("div", null, h("div", { class: "translate-input" }, h("h4", null, this.description), h("input", { type: "text", value: this.word, placeholder: this.example }))));
        };
        Object.defineProperty(Input, "is", {
            get: function () { return "imr-input"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input, "properties", {
            get: function () {
                return {
                    "description": {
                        "type": String,
                        "attr": "description"
                    },
                    "example": {
                        "type": String,
                        "attr": "example"
                    },
                    "word": {
                        "type": String,
                        "attr": "word",
                        "watchCallbacks": ["render"]
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return Input;
    }());
    /**
     *
     *
     * @export
     * @class LanguageCard
     */
    var LanguageCard = /** @class */ (function () {
        function LanguageCard() {
        }
        LanguageCard.prototype.render = function () {
            return [
                h("img", { src: "" + this.imgPath, srcSet: this.imgPath + " 1x, " + this.imgPath + "@2x 2x", alt: this.alt }),
                h("p", null, this.name)
            ];
        };
        Object.defineProperty(LanguageCard, "is", {
            get: function () { return "imr-language-card"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LanguageCard, "properties", {
            get: function () {
                return {
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
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LanguageCard, "style", {
            get: function () { return ""; },
            enumerable: true,
            configurable: true
        });
        return LanguageCard;
    }());
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
    var LanguageList = /** @class */ (function () {
        function LanguageList() {
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
        LanguageList.prototype.render = function () {
            return (this.languages.map(function (demo) { return h("imr-language-card", { name: demo.name, imgPath: demo.imgPath, alt: demo.alt }); }));
        };
        Object.defineProperty(LanguageList, "is", {
            get: function () { return "imr-language-list"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LanguageList, "style", {
            get: function () { return "imr-language-list {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-gap: 10px;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  imr-language-list imr-language-card {\n    padding-bottom: 1em;\n    cursor: pointer; }\n    imr-language-list imr-language-card h4 {\n      margin-bottom: 0; }\n    imr-language-list imr-language-card p {\n      margin-top: .5em;\n      margin-bottom: 0;\n      line-height: 1.5; }\n    imr-language-list imr-language-card img {\n      width: 100%; }\n      imr-language-list imr-language-card img:hover {\n        border: 1px solid #dadada;\n        border-radius: 4px;\n        outline: none;\n        -webkit-box-shadow: 0 0 2em #9ecaed;\n        box-shadow: 0 0 2em #9ecaed; }"; },
            enumerable: true,
            configurable: true
        });
        return LanguageList;
    }());
    var MainPage = /** @class */ (function () {
        function MainPage() {
            var _this = this;
            this.reload = function () {
                chrome.runtime.sendMessage({ message: "reload" }, function (response) {
                    console.log("SENT GREETING atm");
                });
            };
            this.settings = {
                value: "",
                translation: "",
                caseSensitive: false,
                ignoreWhiteSpace: false
            };
            this.addWord = function () {
                if (_this.settings.value.length == 0)
                    return;
                chrome.storage.sync.get(['imrkorean'], function (result) {
                    var newItems = result['imrkorean'];
                    newItems[_this.settings.value] = _this.settings;
                    chrome.storage.sync.set({ 'imrkorean': newItems }), function (msg) {
                        console.log("adding word to list: " + msg);
                    };
                    var inputs = _this.el.querySelectorAll("input");
                    inputs.forEach(function (imrinput) {
                        imrinput.value = "";
                    });
                });
            };
            document.title = "Immerse";
        }
        MainPage.prototype.valueBind = function (event) {
            this.settings.value = event.target.value;
        };
        MainPage.prototype.translationBind = function (event) {
            this.settings.translation = event.target.value;
        };
        MainPage.prototype.render = function () {
            var _this = this;
            return (h("div", { class: "main-wrapper" }, h("button", { class: "round", onClick: this.reload }, h("i", { class: "fas fa-redo" })), h("imr-language-list", null), h("main", null, h("h2", null, "Immerse"), h("imr-input", { description: "Old word", example: "cat", onChange: function (event) { return _this.valueBind(event); } }), h("imr-input", { description: "New word", example: "Katze", onChange: function (event) { return _this.translationBind(event); } }), h("button", { id: "add-button", class: "imr-success", onClick: this.addWord }, "Add"))));
        };
        Object.defineProperty(MainPage, "is", {
            get: function () { return "imr-view-main"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainPage, "properties", {
            get: function () {
                return {
                    "el": {
                        "elementRef": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainPage, "style", {
            get: function () { return "button {\n  outline: none;\n  margin-top: 5px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  min-height: 38px;\n  font-size: 13px;\n  font-weight: bold;\n  padding: .2em 2em;\n  white-space: nowrap;\n  text-transform: uppercase;\n  cursor: pointer;\n  -webkit-transform: all .2 ease;\n  transform: all .2 ease; }\n  button.imr-success {\n    background: #1E8AE7;\n    color: #ffffff; }\n    button.imr-success:focus {\n      background: #1A79C0;\n      -webkit-box-shadow: 0 0 6px 2px rgba(30, 138, 231, 0.6);\n      box-shadow: 0 0 6px 2px rgba(30, 138, 231, 0.6); }\n    button.imr-success:disabled, button.imr-success[disabled] {\n      background: #EBF2FA; }\n\nimr-view-main .main-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  margin-top: 1em; }\n\nimr-view-main #logo {\n  width: 4em;\n  height: 4em; }\n\nimr-view-main .round {\n  margin-bottom: 2em;\n  left: 50%;\n  top: 0;\n  width: 30px;\n  border-radius: 50%;\n  -ms-flex-line-pack: center;\n  align-content: center;\n  padding: 5px 5px 5px 5px; }\n\nimr-view-main #action-call {\n  font-size: 3.2em;\n  text-align: center;\n  width: 16em;\n  line-height: normal;\n  margin-top: 20px; }\n\nimr-view-main button:hover {\n  -webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);\n  -webkit-transform: translateY(1px);\n  transform: translateY(1px); }\n\nimr-view-main #get-started {\n  background: #5851ff;\n  color: white; }\n\nimr-view-main #learn-more {\n  background: white;\n  color: #5851ff; }\n\nimr-view-main #background {\n  height: 100%;\n  position: fixed;\n  width: 100%;\n  z-index: 8888;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  opacity: 0;\n  pointer-events: none;\n  background-color: #00082d;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);\n  transition: opacity 0.3s cubic-bezier(0.36, 0.66, 0.04, 1); }\n\nimr-view-main .background-show {\n  opacity: 0.4 !important;\n  pointer-events: auto !important; }\n\nimr-view-main #three-points {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  text-align: center;\n  margin-top: 3.2em;\n  margin-bottom: 2.8em; }\n\nimr-view-main .point-card {\n  margin: 2.4em;\n  position: relative; }\n  imr-view-main .point-card h2 {\n    margin-top: 72px; }\n  imr-view-main .point-card p {\n    color: #626177;\n    font-weight: 400;\n    font-size: 16px;\n    letter-spacing: -0.02em;\n    line-height: 30px; }\n  imr-view-main .point-card::before {\n    position: absolute;\n    background: url(/assets/img/feature-icons.png) no-repeat;\n    background-size: 48px;\n    height: 48px;\n    width: 48px;\n    content: \"\";\n    top: 0;\n    left: calc(50% - 24px); }\n  imr-view-main .point-card.performant::before {\n    background-position: 0 -48px; }\n  imr-view-main .point-card.future-proof::before {\n    background-position: 0 -96px; }\n\n\@media screen and (max-width: 740px) {\n  imr-view-main #action-call {\n    width: auto; }\n  imr-view-main #launch-video {\n    display: none; }\n  imr-view-main #youtube-video {\n    display: none; }\n  imr-view-main #mobile-video {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  imr-view-main #three-points {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    text-align: left; }\n    imr-view-main #three-points .point-card {\n      margin: 1em 2.4em; }\n    imr-view-main #three-points .point-card::before {\n      left: 0; } }"; },
            enumerable: true,
            configurable: true
        });
        return MainPage;
    }());
    exports.ImrInput = Input;
    exports.ImrLanguageCard = LanguageCard;
    exports.ImrLanguageList = LanguageList;
    exports.ImrViewMain = MainPage;
    Object.defineProperty(exports, '__esModule', { value: true });
});
