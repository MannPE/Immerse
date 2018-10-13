/**
 *
 * @export
 * @class TranslateInput
 * Represents a custom input that includes a title and placeholder.
 * @property {string} word - the value inside of the input.
 * @property {string} description - This will be the title of such input.
 * @property {string} example - The placeholder inside of the input.
 */
export class Input {
    render() {
        console.log("RENDERING INPUT", this.word);
        return (h("div", null,
            h("div", { class: "translate-input" },
                h("h4", null, this.description),
                h("input", { type: "text", value: this.word, placeholder: this.example }))));
    }
    static get is() { return "imr-input"; }
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
            "attr": "word",
            "watchCallbacks": ["render"]
        }
    }; }
    static get style() { return "/**style-placeholder:imr-input:**/"; }
}
