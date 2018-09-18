export class AppRoot {
    constructor() {
        this.elements = [
            'site-header',
            'site-menu',
            'app-burger',
            '.root'
        ];
    }
    handleResize() {
        requestAnimationFrame(() => {
            if (window.innerWidth > 768 && this.isLeftSidebarIn) {
                this.isLeftSidebarIn = false;
                document.body.classList.remove('no-scroll');
                this.elements.forEach((el) => {
                    this.el.querySelector(el).classList.remove('left-sidebar-in');
                });
            }
        });
    }
    componentDidLoad() {
        this.isLeftSidebarIn = false;
    }
    render() {
        return [
            h("imr-app-header", null),
            h("div", { class: "root" },
                h("div", { class: "container" },
                    h("stencil-router", { scrollTopOffset: 0 },
                        h("stencil-route-switch", null,
                            h("stencil-route", { url: "/words", component: "imr-view-word-list" }),
                            h("stencil-route", { url: "/settings", component: "pwas-page" }),
                            h("stencil-route", { component: "imr-view-main" })))),
                ",",
                h("footer", null,
                    h("div", { class: "container" },
                        h("div", { class: "footer__open-source" },
                            h("p", null, "Made by Manuel Puentes @2018")),
                        h("div", { class: "footer__icons" },
                            h("a", { class: "svg-button", id: "stencil-twitter", href: "https://twitter.com/stenciljs", target: "_blank", rel: "noopener", title: "Follow me on " },
                                h("app-icon", { name: "twitter" })),
                            h("a", { class: "svg-button", id: "ionic-forum", href: "https://stencil-worldwide.herokuapp.com", target: "_blank", rel: "noopener", title: "Join the stencil worldwide slack" },
                                h("app-icon", { name: "slack" }))))))
        ];
    }
    static get is() { return "imr-app-root"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "isLeftSidebarIn": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "window:resize",
            "method": "handleResize",
            "passive": true
        }]; }
    static get style() { return "/**style-placeholder:imr-app-root:**/"; }
}
