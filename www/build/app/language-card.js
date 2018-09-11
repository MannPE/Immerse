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
        return (h("div", null,
            h("div", { class: "demo-card__image" },
                h("a", { target: "_blank", rel: "noopener" },
                    h("img", { src: `${this.imgPath}`, srcSet: `${this.imgPath} 1x, ${this.imgPath}@2x 2x`, alt: this.alt }))),
            h("p", null, this.name)));
    }
    static get is() { return "language-card"; }
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
    static get style() { return ".language-card-list {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-gap: 10px; }\n\nlanguage-card {\n  padding-bottom: 20px; }\n  language-card h4 {\n    margin-bottom: 0; }\n  language-card p {\n    margin-top: 8px;\n    margin-bottom: 0;\n    line-height: 1.5; }\n\n.demo-card__image {\n  border-radius: 15px;\n  background: #fff;\n  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.14), 0 4px 7px 0 rgba(0, 0, 0, 0.09);\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.14), 0 4px 7px 0 rgba(0, 0, 0, 0.09);\n  border-radius: 13px; }\n  .demo-card__image img {\n    width: 100%;\n    vertical-align: bottom; }"; }
}

class MainPage {
    constructor() {
        document.title = `Stencil`;
    }
    componentDidLoad() {
        console.log('didLoad called on landing page');
        // unfortunately necessary hack because Edge
        // dont show the animated youtube video in Edge because
        // pointer-events: none; is broken in Edge
        // just link to the youtube video directly like we do on mobile
        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            this.el.querySelector('#youtube-video').style.display = 'none';
            this.el.querySelector('#launch-video').style.display = 'none';
            this.el.querySelector('#background').style.display = 'none';
            this.el.querySelector('#mobile-video').style.display = 'flex';
        }
    }
    openYoutube() {
        const youtube = this.el.querySelector('#youtube-video');
        const background = this.el.querySelector('#background');
        youtube.classList.add('youtube-show');
        background.classList.add('background-show');
    }
    closeBackground() {
        const youtube = this.el.querySelector('#youtube-video');
        const background = this.el.querySelector('#background');
        youtube.classList.remove('youtube-show');
        background.classList.remove('background-show');
    }
    render() {
        return (h("div", null,
            h("div", { onClick: () => { this.closeBackground(); }, id: "background" }),
            !this.isServer && window.matchMedia('(min-width: 740px)').matches ? h("div", { id: "youtube-video", onClick: () => { this.closeBackground(); } },
                h("lazy-iframe", { src: "https://www.youtube.com/embed/UfD-k7aHkQE", width: "700", height: "450", title: "Ionic team at Polymer Summit video" })) : null,
            h("main", null,
                h("translate-flag-list", null),
                h("h2", null, "Immerse"),
                h("translate-input", { description: "Old word", example: "cat" }),
                h("translate-input", { description: "New word", example: "Katze" }),
                h("button", { id: "add-button" }, "Add"))));
    }
    static get is() { return "main-page"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "isServer": {
            "context": "isServer"
        }
    }; }
    static get style() { return "main-page main {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  margin-top: 3em; }\n\nmain-page #logo {\n  width: 4em;\n  height: 4em; }\n\nmain-page #action-call {\n  font-size: 3.2em;\n  text-align: center;\n  width: 16em;\n  line-height: normal;\n  margin-top: 20px; }\n\nmain-page button {\n  margin: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 16px 20px;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);\n  outline: none;\n  letter-spacing: 0.04em;\n  -webkit-transition: all .15s ease;\n  transition: all .15s ease;\n  cursor: pointer; }\n\nmain-page button:hover {\n  -webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);\n  -webkit-transform: translateY(1px);\n  transform: translateY(1px); }\n\nmain-page #get-started {\n  background: #5851ff;\n  color: white; }\n\nmain-page #learn-more {\n  background: white;\n  color: #5851ff; }\n\nmain-page #youtube-video {\n  opacity: 0;\n  -webkit-transition: opacity 0.3s, -webkit-transform 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);\n  transition: opacity 0.3s, -webkit-transform 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);\n  transition: opacity 0.3s, transform 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);\n  transition: opacity 0.3s, transform 0.3s cubic-bezier(0.36, 0.66, 0.04, 1), -webkit-transform 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);\n  position: absolute;\n  z-index: 9999;\n  pointer-events: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  left: 0;\n  width: 100%; }\n  main-page #youtube-video iframe {\n    -webkit-box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.2);\n    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.2);\n    border-radius: 8px; }\n\nmain-page .youtube-show {\n  opacity: 1 !important;\n  -webkit-transform: translatey(-30px) !important;\n  transform: translatey(-30px) !important;\n  pointer-events: auto !important; }\n\nmain-page #background {\n  height: 100%;\n  position: fixed;\n  width: 100%;\n  z-index: 8888;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  opacity: 0;\n  pointer-events: none;\n  background-color: #00082d;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);\n  transition: opacity 0.3s cubic-bezier(0.36, 0.66, 0.04, 1); }\n\nmain-page .background-show {\n  opacity: 0.4 !important;\n  pointer-events: auto !important; }\n\nmain-page #three-points {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  text-align: center;\n  margin-top: 3.2em;\n  margin-bottom: 2.8em; }\n\nmain-page .point-card {\n  margin: 2.4em;\n  position: relative; }\n  main-page .point-card h2 {\n    margin-top: 72px; }\n  main-page .point-card p {\n    color: #626177;\n    font-weight: 400;\n    font-size: 16px;\n    letter-spacing: -0.02em;\n    line-height: 30px; }\n  main-page .point-card::before {\n    position: absolute;\n    background: url(/assets/img/feature-icons.png) no-repeat;\n    background-size: 48px;\n    height: 48px;\n    width: 48px;\n    content: \"\";\n    top: 0;\n    left: calc(50% - 24px); }\n  main-page .point-card.performant::before {\n    background-position: 0 -48px; }\n  main-page .point-card.future-proof::before {\n    background-position: 0 -96px; }\n\nmain-page #launch-video, main-page #mobile-video {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  line-height: 4;\n  -webkit-transition: all .2s ease;\n  transition: all .2s ease;\n  cursor: pointer;\n  text-decoration: none;\n  outline: none; }\n  main-page #launch-video:hover, main-page #mobile-video:hover {\n    opacity: 0.7; }\n  main-page #launch-video img, main-page #mobile-video img {\n    height: 1.2em; }\n  main-page #launch-video span, main-page #mobile-video span {\n    font-size: 14px;\n    margin-left: 8px;\n    color: #5851ff;\n    font-weight: 500;\n    -webkit-transition: all .15s ease;\n    transition: all .15s ease; }\n\nmain-page #mobile-video {\n  display: none; }\n\n\@media screen and (max-width: 740px) {\n  main-page #action-call {\n    width: auto; }\n  main-page #launch-video {\n    display: none; }\n  main-page #youtube-video {\n    display: none; }\n  main-page #mobile-video {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  main-page #three-points {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    text-align: left; }\n    main-page #three-points .point-card {\n      margin: 1em 2.4em; }\n    main-page #three-points .point-card::before {\n      left: 0; } }"; }
}

/**
 *
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
class TranslateFlagList {
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
        return (h("div", { class: "language-card-list" }, this.languages.map(demo => h("language-card", { name: demo.name, imgPath: demo.imgPath, alt: demo.alt }))));
    }
    static get is() { return "translate-flag-list"; }
    static get style() { return ""; }
}

/**
 *
 * @export
 * @class TranslateInput
 * Represents a custom input that includes a title and placeholder.
 * @property {string} word - the value inside of the input.
 * @property {string} description - This will be the title of such input.
 * @property {string} example - The placeholder inside of the input.
 */
class TranslateInput {
    render() {
        return (h("div", null,
            h("div", { class: "translate-input" },
                h("h4", null, this.description),
                h("input", { type: "text", value: this.word, placeholder: this.example }))));
    }
    static get is() { return "translate-input"; }
    static get properties() { return {
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
            "attr": "word"
        }
    }; }
    static get style() { return ""; }
}

export { LanguageCard, MainPage, TranslateFlagList, TranslateInput };
