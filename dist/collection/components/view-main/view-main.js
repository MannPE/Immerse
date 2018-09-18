export class MainPage {
    constructor() {
        document.title = `Immerse`;
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
    render() {
        return (h("div", { class: "main-wrapper" },
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
