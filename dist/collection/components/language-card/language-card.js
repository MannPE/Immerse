/**
 *
 *
 * @export
 * @class LanguageCard
 */
export class LanguageCard {
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
    static get style() { return "/**style-placeholder:imr-language-card:**/"; }
}
