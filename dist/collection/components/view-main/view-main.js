export class MainPage {
    constructor() {
        this.reload = function () {
            document.getElementById('reload').onclick = function () {
                chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
                    console.log("SENT GREETING atm");
                    console.log(response);
                });
            };
        };
        document.title = `Immerse`;
    }
    render() {
        return (h("div", { class: "main-wrapper" },
            h("button", { id: "reload", onClick: this.reload }, "RELOAD"),
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
