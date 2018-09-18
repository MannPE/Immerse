/*! Built with http://stenciljs.com */
App.loadBundle('pwas-page', ['exports'], function (exports) {
    var h = window.App.h;
    var pwasPage = /** @class */ (function () {
        function pwasPage() {
            this.demos = [
                {
                    title: 'Stenciljs.com',
                    description: 'Yep, this site is built as a PWA!',
                    imgPath: '/assets/img/demos/demo-stenciljs',
                    demoUrl: 'https://stenciljs.com/',
                    sourceUrl: 'https://github.com/ionic-team/stencil-site',
                },
                {
                    title: 'IonicHN',
                    description: 'Hacker News PWA built with @stencil/core and @ionic/core',
                    imgPath: '/assets/img/demos/demo-ionichn',
                    demoUrl: 'https://corehacker-10883.firebaseapp.com/',
                    sourceUrl: 'https://github.com/ionic-team/ionic-stencil-hn-app'
                },
                {
                    title: 'Stencil Fiber demo',
                    description: 'This showcases the runtime performance of stencil using our async rendering',
                    imgPath: '/assets/img/demos/demo-fiber',
                    demoUrl: 'https://stencil-fiber-demo.firebaseapp.com/',
                    sourceUrl: 'https://github.com/ionic-team/stencil-fiber-demo'
                },
            ];
            document.title = "PWAs";
        }
        pwasPage.prototype.render = function () {
            return (h("div", null, h("div", { class: "measure-xl" }, h("img", { src: "/assets/img/pwa-toolkit-logo.png", srcSet: "/assets/img/pwa-toolkit-logo.png 1x, /assets/img/pwa-toolkit-logo@2x.png 2x" }), h("h1", null, "Everything you need to easily build fast, production ready Progressive Web Apps")), h("ul", { class: "list--unstyled list--icon list--columns" }, h("li", null, h("app-icon", { name: "checkmark" }), " Push notifications"), h("li", null, h("app-icon", { name: "checkmark" }), " Routing"), h("li", null, h("app-icon", { name: "checkmark" }), " Pre-rendering"), h("li", null, h("app-icon", { name: "checkmark" }), " Update toasts"), h("li", null, h("app-icon", { name: "checkmark" }), " Unit Tests"), h("li", null, h("app-icon", { name: "checkmark" }), " Zero config lazy loading"), h("li", null, h("app-icon", { name: "checkmark" }), " Zero config code splitting"), h("li", null, h("app-icon", { name: "checkmark" }), " ES6 by default"), h("li", null, h("app-icon", { name: "checkmark" }), " Selective polyfills"), h("li", null, h("app-icon", { name: "checkmark" }), " Lazy image loading"), h("li", null, h("app-icon", { name: "checkmark" }), " Everything needed for an add to homescreen PWA")), h("div", { class: "measure-lg" }, h("h3", null, "Getting started with the Ionic PWA Toolkit"), h("ol", { class: "list--numbered-badge" }, h("li", null, h("span", null, "In your terminal, run: ", h("br", null), h("code", null, "git clone https://github.com/ionic-team/ionic-pwa-toolkit my-pwa"))), h("li", null, h("span", null, "Run ", h("code", null, "npm install"))), h("li", null, h("span", null, "Run ", h("code", null, "npm run build")))), h("p", null, "And with just those three commands you now have a great looking PWA that scores 100 on lighthouse right out of the box."), h("img", { class: "screenshot", src: "/assets/img/pwa-lighthouse-score.png", srcSet: "/assets/img/pwa-lighthouse-score.png 1x, /assets/img/pwa-lighthouse-score@2x.png 2x" }), h("h3", { class: "push" }, "Under the hood"), h("h4", null, "Ionic"), h("p", null, "The Ionic PWA Toolkit uses an early release of Ionic 4. Ionic 4 is built completely out of web components using Stencil. This means that you can use Ionic 4 just like any other Stencil collection and you will be able to use any of the Ionic components with minimal to no overhead."), h("h4", null, "Routing"), h("p", null, "The Ionic PWA Toolkit uses the Stencil Router.", h("stencil-route-link", { url: "docs/routing", class: "block" }, "Read more about the Stencil Router")), h("h4", null, "Service Worker"), h("p", null, "When you run ", h("code", null, "npm run build"), " we automatically generate a Service Worker for you using ", h("a", { href: "https://workboxjs.org/" }, "Workbox"), " that handles pre-caching your assets.", h("stencil-route-link", { url: "/docs/service-workers", class: "block" }, "Read more about Service Workers")), h("h4", null, "Web Manifest"), h("p", null, "By default we include a Web Manifest that has all the neccessary entries to get the Add to Homescreen prompt. You can see that web manifest ", h("a", { href: "https://github.com/ionic-team/ionic-pwa-toolkit/blob/master/src/manifest.json" }, "here"), ".")), h("h3", { class: "push" }, "PWAs built with Stencil"), h("div", { class: "demo-card-list" }, this.demos.map(function (demo) {
                return (h("demo-card", { name: demo.title, description: demo.description, imgPath: demo.imgPath, demoUrl: demo.demoUrl, sourceUrl: demo.sourceUrl }));
            }))));
        };
        Object.defineProperty(pwasPage, "is", {
            get: function () { return "pwas-page"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(pwasPage, "style", {
            get: function () { return "pwas-page h3 + .demo-card-list {\n  margin-top: 32px; }\n\n\@media screen and (max-width: 768px) {\n  pwas-page .measure-xl {\n    text-align: center; } }"; },
            enumerable: true,
            configurable: true
        });
        return pwasPage;
    }());
    exports.PwasPage = pwasPage;
    Object.defineProperty(exports, '__esModule', { value: true });
});
