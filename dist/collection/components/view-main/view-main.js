export class MainPage {
    constructor() {
        document.title = `Immerse`;
    }
    render() {
        return (h("div", { class: "main-wrapper" },
            h("button", { id: "reload" }, "RELOAD"),
            h("imr-language-list", null),
            h("main", null,
                h("h2", null, "Immerse"),
                h("imr-input", { description: "Old word", example: "cat" }),
                h("imr-input", { description: "New word", example: "Katze" }),
                h("button", { id: "add-button" }, "Add"))));
    }
    static get is() { return "imr-view-main"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:imr-view-main:**/"; }
}
