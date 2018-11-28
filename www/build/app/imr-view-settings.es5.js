/*! Built with http://stenciljs.com */
App.loadBundle('imr-view-settings', ['exports'], function (exports) {
    var h = window.App.h;
    var viewSettings = /** @class */ (function () {
        function viewSettings() {
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
            this.openFile = function () {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    console.log("started to open file");
                    chrome.tabs.executeScript(tabs[0].id, { file: "extension/bg/importFile.js" });
                });
            };
            this.exportFile = function () {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    console.log("saving file..");
                    chrome.tabs.executeScript(tabs[0].id, { file: "extension/bg/exportFile.js" });
                    console.log("Saving finished");
                });
            };
            document.title = "PWAs";
        }
        viewSettings.prototype.render = function () {
            return (h("div", null, h("div", { class: "measure-lg" }, h("h4", null, "Import words"), h("p", null, h("button", { onClick: this.openFile }, " IMPORT ")), h("h4", null, "Export wordlist"), h("p", null, h("button", { onClick: this.exportFile }, " EXPORT ")), h("h4", null, "Default settings"), h("p", null, "The Ionic PWA Toolkit uses the Stencil Router.", h("stencil-route-link", { url: "docs/routing", class: "block" }, "Read more about the Stencil Router")), h("h4", null, "Service Worker"), h("p", null, "When you run ", h("code", null, "npm run build"), " we automatically generate a Service Worker for you using ", h("a", { href: "https://workboxjs.org/" }, "Workbox"), " that handles pre-caching your assets.", h("stencil-route-link", { url: "/docs/service-workers", class: "block" }, "Read more about Service Workers")), h("h4", null, "Web Manifest"), h("p", null, "By default we include a Web Manifest that has all the neccessary entries to get the Add to Homescreen prompt. You can see that web manifest ", h("a", { href: "https://github.com/ionic-team/ionic-pwa-toolkit/blob/master/src/manifest.json" }, "here"), ".")), h("h3", { class: "push" }, "PWAs built with Stencil"), h("div", { class: "demo-card-list" }, this.demos.map(function (demo) {
                return (h("demo-card", { name: demo.title, description: demo.description, imgPath: demo.imgPath, demoUrl: demo.demoUrl, sourceUrl: demo.sourceUrl }));
            }))));
        };
        Object.defineProperty(viewSettings, "is", {
            get: function () { return "imr-view-settings"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(viewSettings, "style", {
            get: function () { return "imr-view-settings h3 + .demo-card-list {\n  margin-top: 32px; }\n\n\@media screen and (max-width: 768px) {\n  imr-view-settings .measure-xl {\n    text-align: center; } }"; },
            enumerable: true,
            configurable: true
        });
        return viewSettings;
    }());
    exports.ImrViewSettings = viewSettings;
    Object.defineProperty(exports, '__esModule', { value: true });
});
