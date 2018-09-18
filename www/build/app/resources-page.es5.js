/*! Built with http://stenciljs.com */
App.loadBundle('resources-page', ['exports'], function (exports) {
    var h = window.App.h;
    var ResourcesPage = /** @class */ (function () {
        function ResourcesPage() {
            this.LINKS = {
                TEMPLATES: [
                    { title: 'Official Stencil App Starter Project', url: 'https://github.com/ionic-team/stencil-app-starter' },
                    { title: 'Official Stencil Component Starter Project', url: 'https://github.com/ionic-team/stencil-component-starter' },
                    { title: 'Stencil Boilerplate with Server Side Rendering', url: 'https://github.com/mitchellsimoens/stencil-boilerplate' },
                    { title: 'Angular Stencil: use Stencil-built components in Angular', url: 'https://github.com/seveves/angular-stencil' }
                ],
                COMPONENTS: [
                    { title: 'Stencil Card Component', url: 'https://github.com/henriquecustodia/stencil-card-app' },
                    { title: 'st-image: lazy loaded images', url: 'https://github.com/jgw96/st-img' },
                    { title: 'st-payment: Stencil Payment API Component', url: 'https://github.com/Fdom92/stencil-payment' },
                    { title: 'st-fetch: A simple component for performing http fetch calls', url: 'https://github.com/Fdom92/stencil-fetch' },
                    { title: 'web-photo-filter: Use webGL for amazing instagram like filters', url: 'https://github.com/peterpeterparker/web-photo-filter' },
                    { title: 'stencil-flip-images: Awesome animated image gallery', url: 'https://github.com/jepiqueau/stencil-flip-images' }
                ],
                TOOLS: [
                    { title: 'yo Stencil: A yeoman generator for Stencil', url: 'https://github.com/AkashGutha/generator-stencil' },
                    { title: 'Stencil Snippets: A Stencil snippets package for VS Code', url: 'https://marketplace.visualstudio.com/items?itemName=fdom.stencil-snippets' }
                ],
                BLOGS: [
                    { title: 'Announcing Stencil.js', url: 'https://www.youtube.com/watch?v=UfD-k7aHkQE' },
                    { title: 'Stencil - Getting Started (video)', url: "https://www.youtube.com/watch?v=MqMYaT1GlWY" },
                    { title: 'Using a Stencil-built component in Angular', url: "https://github.com/ospatil/ng-components-integration" },
                    { title: 'Create your First Stencil Component', url: 'https://coryrylan.com/blog/create-your-first-web-component-with-stencil-js' },
                    { title: 'Getting Started with Stencil', url: 'https://alligator.io/stencil/getting-started/' },
                    { title: "Stencil.js: It's finally time for vanilla web components!", url: 'https://medium.com/@sinedied/stencil-js-its-finally-time-for-vanilla-web-components-927d26b573e1' },
                    { title: "Stencil with MobX", url: 'https://github.com/aaronksaunders/stencil-mobx' },
                    { title: "Webkomponenten mit Stencil – Ein erster Überblick (in German)", url: 'https://www.datacodedesign.de/webkomponenten-mit-stencil-ein-erster-ueberblick/' },
                    { title: 'Stencil’e Giriş (in Turkish)', url: 'https://medium.com/t%C3%BCrkiye/stencile-giri%C5%9F-41e90e37595d' },
                    { title: 'Stencil’de Bileşenler Arası Haberleşme (in Turkish)', url: 'https://medium.com/t%C3%BCrkiye/stencilde-bilesenler-arasi-haberlesme-52523a470fa9' }
                ]
            };
            document.title = "Stencil Resources";
        }
        ResourcesPage.prototype.render = function () {
            return [
                h("h1", { class: "headline measure-md" }, "Resources to help you get more out of Stencil"),
                h("div", { class: "measure-lg" }, h("div", null, h("h2", null, "Community Articles/Blogs"), h("p", null, "Disclaimer: these articles are community-created, and might contain inaccurate, or outdated information and code snippets."), h("ul", { class: "list--unstyled" }, this.LINKS.BLOGS.map(function (link) {
                    return (h("li", null, h("a", { target: "_blank", href: link.url }, link.title)));
                }))), h("div", null, h("h2", null, "Third-party Components, Templates and Tools"), h("ul", { class: "list--unstyled" }, this.LINKS.COMPONENTS.map(function (link) {
                    return (h("li", null, h("a", { target: "_blank", href: link.url }, link.title)));
                }), this.LINKS.TEMPLATES.map(function (link) {
                    return (h("li", null, h("a", { target: "_blank", href: link.url }, link.title)));
                }), this.LINKS.TOOLS.map(function (link) {
                    return (h("li", null, h("a", { target: "_blank", href: link.url }, link.title)));
                }))), h("div", null, h("h2", null, "Present Stencil"), h("div", { class: "slide-wrapper screenshot" }, h("lazy-iframe", { src: "https://ionic-team.github.io/stencil-present/", title: "Present Stencil" })), h("p", null, "A forkable presentation for your next meetup or conference talk on Stencil. Built with ", h("a", { href: "https://github.com/hakimel/reveal.js" }, "Reveal.js")), h("a", { target: "_blank", href: "https://ionic-team.github.io/stencil-present/" }, "Stencil Presentation"), h("br", null), h("a", { target: "_blank", href: "https://github.com/ionic-team/stencil-present/" }, "Source")))
            ];
        };
        Object.defineProperty(ResourcesPage, "is", {
            get: function () { return "resources-page"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourcesPage, "style", {
            get: function () { return "resources-page .list--unstyled {\n  line-height: 1.4; }\n  resources-page .list--unstyled li + li {\n    margin-top: 20px; }\n\nresources-page h2 + .list--unstyled {\n  margin-top: 22px; }\n\nresources-page .slide-wrapper {\n  position: relative;\n  padding-bottom: 56.25%;\n  /* 16:9 */\n  padding-top: 25px;\n  height: 0; }\n  resources-page .slide-wrapper iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n\nresources-page a {\n  text-decoration: none; }"; },
            enumerable: true,
            configurable: true
        });
        return ResourcesPage;
    }());
    exports.ResourcesPage = ResourcesPage;
    Object.defineProperty(exports, '__esModule', { value: true });
});
