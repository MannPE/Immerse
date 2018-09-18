/*! Built with http://stenciljs.com */
const { h } = window.App;

class SiteHeader {
    constructor() {
        this.isMobileMenuShown = true;
    }
    handleResize() {
        requestAnimationFrame(() => {
            if (window.innerWidth > 768) {
                const menu = this.el.querySelector('.header-menu');
                menu.style.display = "";
                this.el.classList.remove('show-mobile-menu');
                document.body.classList.remove('no-scroll');
                this.isMobileMenuShown = false;
            }
        });
    }
    componentDidLoad() {
        this.isMobileMenuShown = true;
    }
    showNav() {
        if (this.isMobileMenuShown)
            return;
        this.isMobileMenuShown = true;
        const menu = this.el.querySelector('.header-menu');
        menu.style.display = "flex";
        setTimeout(() => {
            this.el.classList.add('show-mobile-menu');
            document.body.classList.add('no-scroll');
        }, 1);
    }
    hideNav() {
        if (!this.isMobileMenuShown)
            return;
        this.isMobileMenuShown = false;
        const menu = this.el.querySelector('.header-menu');
        this.el.classList.remove('show-mobile-menu');
        setTimeout(() => {
            menu.style.display = "none";
            document.body.classList.remove('no-scroll');
        }, 300);
    }
    render() {
        return (h("div", { class: "container" },
            h("stencil-route-link", { url: "/", class: "logo-link" },
                h("img", { class: "logo", alt: "Stencil", src: "/assets/img/stencil-logo-new.svg" })),
            h("div", { class: "header-menu" },
                h("stencil-route-link", { urlMatch: "/docs", url: "/docs/introduction", onClick: () => { this.hideNav(); } }, "Docs"),
                h("stencil-route-link", { url: "/demos", exact: true, onClick: () => { this.hideNav(); } }, "Demos"),
                h("stencil-route-link", { url: "/pwa", exact: true, onClick: () => { this.hideNav(); } }, "PWAs"),
                h("stencil-route-link", { url: "/resources", exact: true, onClick: () => { this.hideNav(); } }, "Resources"),
                h("div", { class: "header-close", onClick: () => { this.hideNav(); } },
                    h("app-icon", { name: "close" }))),
            h("div", { class: "header-overflow", onClick: () => { this.showNav(); } },
                h("app-icon", { name: "more" }))));
    }
    static get is() { return "site-header"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "isMobileMenuShown": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "window:resize",
            "method": "handleResize",
            "passive": true
        }]; }
    static get style() { return ""; }
}

export { SiteHeader };
