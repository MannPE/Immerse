/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppIcon {
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
    static get style() { return "app-icon .icon-checkmark {\n  fill: #5851ff;\n  width: 15px;\n  height: 11px; }\n\napp-icon .icon-targetblank {\n  fill: #abb2bf;\n  width: 9px;\n  height: 9px; }\n\napp-icon .icon-slack,\napp-icon .icon-twitter, app-icon .icon-trash {\n  fill: #16161D;\n  width: 16px;\n  height: 16px; }\n\napp-icon .icon-menu {\n  fill: #5851ff;\n  width: 17px;\n  height: 15px; }\n\napp-icon .icon-close {\n  fill: #5851ff;\n  width: 14px;\n  height: 14px; }\n\napp-icon .icon-more {\n  fill: #5851ff;\n  width: 4px;\n  height: 18px; }"; }
}

export { AppIcon };
