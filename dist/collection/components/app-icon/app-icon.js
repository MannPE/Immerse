export class AppIcon {
    render() {
        return (h("svg", { class: `icon icon-${this.name}` },
            h("use", { xlinkHref: `#icon-${this.name}` })));
    }
    static get is() { return "app-icon"; }
    static get properties() { return {
        "name": {
            "type": String,
            "attr": "name"
        }
    }; }
    static get style() { return "/**style-placeholder:app-icon:**/"; }
}
