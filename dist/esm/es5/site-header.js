/*! Built with http://stenciljs.com */
import { h } from './app.core.js';
var SiteHeader = /** @class */ (function () {
    function SiteHeader() {
        this.isMobileMenuShown = true;
    }
    SiteHeader.prototype.handleResize = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (window.innerWidth > 768) {
                var menu = _this.el.querySelector('.header-menu');
                menu.style.display = "";
                _this.el.classList.remove('show-mobile-menu');
                document.body.classList.remove('no-scroll');
                _this.isMobileMenuShown = false;
            }
        });
    };
    SiteHeader.prototype.componentDidLoad = function () {
        this.isMobileMenuShown = true;
    };
    SiteHeader.prototype.showNav = function () {
        var _this = this;
        if (this.isMobileMenuShown)
            return;
        this.isMobileMenuShown = true;
        var menu = this.el.querySelector('.header-menu');
        menu.style.display = "flex";
        setTimeout(function () {
            _this.el.classList.add('show-mobile-menu');
            document.body.classList.add('no-scroll');
        }, 1);
    };
    SiteHeader.prototype.hideNav = function () {
        if (!this.isMobileMenuShown)
            return;
        this.isMobileMenuShown = false;
        var menu = this.el.querySelector('.header-menu');
        this.el.classList.remove('show-mobile-menu');
        setTimeout(function () {
            menu.style.display = "none";
            document.body.classList.remove('no-scroll');
        }, 300);
    };
    SiteHeader.prototype.render = function () {
        var _this = this;
        return (h("div", { class: "container" }, h("stencil-route-link", { url: "/", class: "logo-link" }, h("img", { class: "logo", alt: "Stencil", src: "/assets/img/stencil-logo-new.svg" })), h("div", { class: "header-menu" }, h("stencil-route-link", { urlMatch: "/docs", url: "/docs/introduction", onClick: function () { _this.hideNav(); } }, "Docs"), h("stencil-route-link", { url: "/demos", exact: true, onClick: function () { _this.hideNav(); } }, "Demos"), h("stencil-route-link", { url: "/pwa", exact: true, onClick: function () { _this.hideNav(); } }, "PWAs"), h("stencil-route-link", { url: "/resources", exact: true, onClick: function () { _this.hideNav(); } }, "Resources"), h("div", { class: "header-close", onClick: function () { _this.hideNav(); } }, h("app-icon", { name: "close" }))), h("div", { class: "header-overflow", onClick: function () { _this.showNav(); } }, h("app-icon", { name: "more" }))));
    };
    Object.defineProperty(SiteHeader, "is", {
        get: function () { return "site-header"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiteHeader, "properties", {
        get: function () {
            return {
                "el": {
                    "elementRef": true
                },
                "isMobileMenuShown": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiteHeader, "listeners", {
        get: function () {
            return [{
                    "name": "window:resize",
                    "method": "handleResize",
                    "passive": true
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiteHeader, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return SiteHeader;
}());
export { SiteHeader };
