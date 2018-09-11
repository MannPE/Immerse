/*! Built with http://stenciljs.com */
const { h } = window.App;

class SiteHeader {
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
                h("a", { class: "link--external", target: "_blank", href: "https://github.com/ionic-team/stencil" },
                    "GitHub ",
                    h("app-icon", { name: "targetblank" })),
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
    static get style() { return "site-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  background-color: #fff;\n  z-index: 99; }\n  site-header .logo {\n    width: 96px; }\n  site-header .container {\n    padding-top: 20px;\n    padding-bottom: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  \@media screen and (max-width: 768px) {\n    site-header .container {\n      padding-top: 15px;\n      padding-bottom: 15px;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; } }\n\n.header-menu a {\n  -webkit-transition: border .3s, color .3s;\n  transition: border .3s, color .3s;\n  font-size: 14px;\n  padding-bottom: 4px;\n  border-bottom: 3px solid transparent;\n  vertical-align: top;\n  color: #8888A2;\n  text-decoration: none;\n  font-weight: 500;\n  letter-spacing: -0.02em; }\n\n.header-menu stencil-route-link + stencil-route-link,\n.header-menu stencil-route-link + a {\n  margin-left: 30px; }\n\n.header-menu a:not(.link--external):hover,\n.header-menu a.link-active {\n  border-bottom-color: rgba(136, 136, 162, 0.2); }\n\n.header-menu a.link-active {\n  color: #505061; }\n\n.header-menu .link--external .icon {\n  -webkit-transition: top 0.2s, left 0.2s;\n  transition: top 0.2s, left 0.2s;\n  position: relative; }\n\n.header-menu .link--external:hover {\n  color: #505061; }\n  .header-menu .link--external:hover .icon {\n    left: 1px;\n    top: -1px; }\n\n.header-overflow,\n.header-close {\n  -webkit-transition: opacity 0.3s;\n  transition: opacity 0.3s;\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  width: 22px;\n  height: 18px;\n  display: none;\n  cursor: pointer;\n  opacity: 0.7; }\n  .header-overflow:hover,\n  .header-close:hover {\n    opacity: 1; }\n  \@media screen and (max-width: 768px) {\n    .header-overflow,\n    .header-close {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center; } }\n\n.header-close .icon-close {\n  fill: #fff; }\n\n\@media screen and (max-width: 768px) {\n  .header-menu {\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n    position: fixed;\n    z-index: 9999;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    background: #16161D;\n    opacity: 0;\n    display: none; }\n    .header-menu stencil-route-link + stencil-route-link,\n    .header-menu stencil-route-link + a {\n      margin-left: 0px;\n      margin-top: 38px; }\n    .header-menu a {\n      font-size: 24px;\n      color: rgba(235, 235, 247, 0.7); }\n    .header-menu a:not(.link--external):hover,\n    .header-menu a.link-active {\n      border-bottom-color: rgba(235, 235, 247, 0.4); }\n    .header-menu a.link-active,\n    .header-menu a.link-active:hover {\n      color: #fff; }\n    .header-menu stencil-route-link,\n    .header-menu .link--external {\n      -webkit-transition: -webkit-transform 0.4s;\n      transition: -webkit-transform 0.4s;\n      transition: transform 0.4s;\n      transition: transform 0.4s, -webkit-transform 0.4s;\n      -webkit-transform: translateY(8px);\n      transform: translateY(8px); }\n    .header-menu .link--external:hover {\n      color: #fff; }\n  .show-mobile-menu {\n    z-index: 999999; }\n  .show-mobile-menu .header-menu {\n    opacity: 1; }\n  .show-mobile-menu .header-menu stencil-route-link,\n  .show-mobile-menu .header-menu .link--external {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  .show-mobile-menu .header-menu--show + .header-overflow {\n    display: none; } }"; }
}

export { SiteHeader };
