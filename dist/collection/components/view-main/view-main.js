export class MainPage {
    constructor() {
        this.reload = () => {
            chrome.runtime.sendMessage({ message: "reload" }, function (response) {
                console.log("SENT GREETING atm");
                console.log(response);
            });
        };
        this.settings = {
            value: "",
            translation: "",
            insensitive: true,
            ignoreWhiteSpace: false
        };
        this.addWord = () => {
            chrome.storage.sync.get(['imrkorean'], (result) => {
                let newItems = result['imrkorean'];
                newItems[this.settings.value] = this.settings;
                chrome.storage.sync.set({ 'imrkorean': newItems }), function (msg) {
                    console.log("adding word to list: " + msg);
                };
                let inputs = this.el.querySelectorAll("input");
                inputs.forEach(function (imrinput) {
                    imrinput.value = "";
                });
            });
        };
        document.title = `Immerse`;
    }
    valueBind(event) {
        this.settings.value = event.target.value;
    }
    translationBind(event) {
        this.settings.translation = event.target.value;
    }
    render() {
        return (h("div", { class: "main-wrapper" },
            h("button", { class: "round", onClick: this.reload },
                h("i", { class: "fas fa-redo" })),
            h("imr-language-list", null),
            h("main", null,
                h("h2", null, "Immerse"),
                h("imr-input", { description: "Old word", example: "cat", onChange: (event) => this.valueBind(event) }),
                h("imr-input", { description: "New word", example: "Katze", onChange: (event) => this.translationBind(event) }),
                h("button", { id: "add-button", onClick: this.addWord }, "Add"))));
    }
    static get is() { return "imr-view-main"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:imr-view-main:**/"; }
}
