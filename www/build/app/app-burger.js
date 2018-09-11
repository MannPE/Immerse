/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as SiteProviderConsumer } from './chunk-9ad60884.js';

class AppBurger {
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
    static get style() { return "app-burger {\n  display: none;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  z-index: 999; }\n  app-burger > div {\n    padding: 18px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n    app-burger > div:hover app-icon {\n      opacity: 1; }\n  app-burger .icon-menu {\n    display: block; }\n  app-burger .icon-close {\n    display: none; }\n  app-burger app-icon {\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n    opacity: 0.7;\n    cursor: pointer; }\n  app-burger.left-sidebar-in > div {\n    height: 100vh;\n    padding-right: 50px; }\n  app-burger.left-sidebar-in .icon-menu {\n    display: none; }\n  app-burger.left-sidebar-in .icon-close {\n    display: block; }\n\n\@media screen and (max-width: 768px) {\n  app-burger {\n    display: block; } }"; }
}
SiteProviderConsumer.injectProps(AppBurger, ['toggleLeftSidebar']);

class AppMarked {
    componentWillLoad() {
        return this.fetchNewContent();
    }
    fetchNewContent() {
        if (this.doc !== undefined) {
            const doc = document;
            return fetch(`/docs-content/${this.doc}`)
                .then(response => response.text())
                .then(data => {
                this.content = data;
                const el = doc.createElement('div');
                el.innerHTML = data;
                const headerEl = el.querySelector('h1');
                doc.title = (headerEl && headerEl.textContent + ' - Stencil') || 'Stencil';
            });
        }
    }
    render() {
        return [
            h("div", { class: "measure-lg", innerHTML: this.content })
        ];
    }
    static get is() { return "app-marked"; }
    static get properties() { return {
        "content": {
            "state": true
        },
        "doc": {
            "type": String,
            "attr": "doc",
            "watchCallbacks": ["fetchNewContent"]
        }
    }; }
    static get style() { return "app-marked {\n  overflow: hidden; }"; }
}

class DocumentComponent {
    constructor() {
        this.pages = [];
    }
    render() {
        return (h("div", null,
            h("site-menu", null),
            h("app-burger", null),
            this.pages.map(page => h("app-marked", { doc: page }))));
    }
    static get is() { return "document-component"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "pages": {
            "type": "Any",
            "attr": "pages"
        }
    }; }
    static get style() { return "document-component > div {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n\ndocument-component h1 {\n  margin-top: 100px; }\n\ndocument-component h1:first-of-type {\n  margin-top: 0; }\n\ndocument-component ul {\n  padding: 0; }\n  document-component ul li, document-component ul code {\n    font-size: 16px;\n    margin-left: 18px; }\n\ndocument-component .btn.pull-left,\ndocument-component .btn.pull-right {\n  margin: 40px 6px 15px; }"; }
}

class SiteMenu {
    render() {
        return (h(SiteProviderConsumer.Consumer, null, ({ toggleLeftSidebar }) => (h("div", null,
            h("ul", { class: 'menu-list' },
                h("li", null,
                    h("h4", null, "Introduction"),
                    h("ul", null,
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/introduction', onClick: () => toggleLeftSidebar() }, "Why Stencil")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/getting-started', onClick: () => toggleLeftSidebar() }, "Getting Started")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/my-first-component', onClick: () => toggleLeftSidebar() }, "My First Component")))),
                h("li", null,
                    h("h4", null, "Reference"),
                    h("ul", null,
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/component-lifecycle', onClick: () => toggleLeftSidebar() }, "Component Life Cycle")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/decorators', onClick: () => toggleLeftSidebar() }, "Decorators")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/events', onClick: () => toggleLeftSidebar() }, "Events")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/reactive-data', onClick: () => toggleLeftSidebar() }, "Reactive Data")),
                        h("li", null,
                            h("stencil-route-link", { url: "/docs/templating-jsx", onClick: () => toggleLeftSidebar() }, "Using JSX")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/styling', onClick: () => toggleLeftSidebar() }, "Styling")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/forms', onClick: () => toggleLeftSidebar() }, "Forms")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/config', onClick: () => toggleLeftSidebar() }, "Config")))),
                h("li", null,
                    h("h4", null, "Guides"),
                    h("ul", null,
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/distribution', onClick: () => toggleLeftSidebar() }, "Distribution")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/prerendering', onClick: () => toggleLeftSidebar() }, "Prerendering")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/server-side-rendering', onClick: () => toggleLeftSidebar() }, "Server Side Rendering")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/service-workers', onClick: () => toggleLeftSidebar() }, "Service Workers")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/context', onClick: () => toggleLeftSidebar() }, "Context")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/unit-testing', onClick: () => toggleLeftSidebar() }, "Unit Testing")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/router', onClick: () => toggleLeftSidebar() }, "Router")),
                        h("li", null,
                            h("stencil-route-link", { url: "/docs/framework-integration", onClick: () => toggleLeftSidebar() }, "Framework Integration")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/style-guide', onClick: () => toggleLeftSidebar() }, "Style Guide")))),
                h("li", null,
                    h("h4", null, "Community"),
                    h("ul", null,
                        h("li", null,
                            h("a", { href: 'https://github.com/ionic-team/stencil' }, "Stencil on GitHub")),
                        h("li", null,
                            h("a", { href: 'https://join.slack.com/t/stencil-worldwide/shared_invite/enQtMjYwNjg5NDMzODQwLTdiNWZiNDMyMWRjZTBiMjIzMGFlOTZiZWVkNDVjNzc2ZTI5MzI2Y2VjZDgwYjczMjU3NWIxMDYzMzI2ZjY3NjM', title: 'Stencil slack channel' }, "Stencil on Slack")),
                        h("li", null,
                            h("a", { href: 'https://twitter.com/stenciljs' }, "Stencil on Twitter")),
                        h("li", null,
                            h("stencil-route-link", { url: '/docs/add-ons', onClick: () => toggleLeftSidebar() }, "Add-ons")))))))));
    }
    static get is() { return "site-menu"; }
    static get style() { return "site-menu {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 200px;\n  flex: 0 0 200px; }\n  site-menu h4 {\n    margin-bottom: 0; }\n  site-menu .menu-list li,\n  site-menu .menu-list ul li {\n    list-style-type: none;\n    margin: 0;\n    padding: 0; }\n  site-menu .menu-list {\n    margin-top: 0; }\n    site-menu .menu-list h4:first-of-type {\n      margin-top: 0; }\n    site-menu .menu-list ul {\n      margin: 0px 0 28px; }\n    site-menu .menu-list li {\n      line-height: 2.2;\n      font-size: 14px; }\n    site-menu .menu-list a {\n      font-weight: 400;\n      color: #6c6c8b;\n      text-decoration: none;\n      border: 0; }\n    site-menu .menu-list a:not(.link-active) {\n      -webkit-transition: color 0.2s;\n      transition: color 0.2s; }\n    site-menu .menu-list a:hover {\n      border: 0; }\n    site-menu .menu-list .link-active {\n      font-weight: bold;\n      color: #5851ff; }\n    site-menu .menu-list a:hover:not(.link-active) {\n      color: #16161D; }\n  \@media screen and (max-width: 768px) {\n    site-menu {\n      position: fixed;\n      top: 0;\n      left: 0;\n      background: #16161D;\n      z-index: 999;\n      padding: 20px;\n      width: calc(100vw - 56px);\n      -webkit-transform: translateX(calc(-100vw + 56px));\n      transform: translateX(calc(-100vw + 56px));\n      height: 100%;\n      overflow-y: scroll; }\n      site-menu .menu-list h4 {\n        color: #fff; }\n      site-menu .menu-list a {\n        color: rgba(255, 255, 255, 0.6); }\n      site-menu .menu-list a:hover:not(.link-active) {\n        color: white; } }"; }
}

export { AppBurger, AppMarked, DocumentComponent, SiteMenu };
