import SiteProviderConsumer from '../../global/site-provider-consumer';
export class AppBurger {
    constructor() {
        this.toggleLeftSidebar = () => { };
    }
    render() {
        return (h("div", { class: "burger", onClick: () => this.toggleLeftSidebar() },
            h("app-icon", { name: "menu" }),
            h("app-icon", { name: "close" })));
    }
    static get is() { return "app-burger"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "toggleLeftSidebar": {
            "type": "Any",
            "attr": "toggle-left-sidebar"
        }
    }; }
    static get style() { return "/**style-placeholder:app-burger:**/"; }
}
SiteProviderConsumer.injectProps(AppBurger, ['toggleLeftSidebar']);
