export class AppHeader {
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
        this.isMobileMenuShown = false;
    }
    showNav(e) {
        console.log("should show now open", this.isMobileMenuShown, e);
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
        console.log("should show now close", this.isMobileMenuShown);
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
            h("div", { class: "header-menu" },
                h("stencil-route-link", { url: "/words", exact: true, onClick: () => { this.hideNav(); } }, "My Words"),
                h("stencil-route-link", { url: "/pwa", exact: true, onClick: () => { this.hideNav(); } }, "Settings"),
                h("stencil-route-link", { url: "/resources", exact: true, onClick: () => { this.hideNav(); } }, "Immerse"),
                h("a", { class: "link--external", target: "_blank", href: "https://github.com/ionic-team/stencil" },
                    "GitHub ",
                    h("app-icon", { name: "targetblank" })),
                h("div", { class: "header-close", onClick: () => { this.hideNav(); } },
                    h("app-icon", { name: "close" }))),
            h("div", { class: "header-overflow", onClick: (e) => { this.showNav(e); } },
                h("app-icon", { name: "more" }))));
    }
    static get is() { return "imr-app-header"; }
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
    static get style() { return "/**style-placeholder:imr-app-header:**/"; }
}
