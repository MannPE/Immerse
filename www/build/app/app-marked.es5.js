/*! Built with http://stenciljs.com */
App.loadBundle('app-marked', ['exports'], function (exports) {
    var h = window.App.h;
    var AppMarked = /** @class */ (function () {
        function AppMarked() {
        }
        AppMarked.prototype.componentWillLoad = function () {
            return this.fetchNewContent();
        };
        AppMarked.prototype.fetchNewContent = function () {
            var _this = this;
            if (this.doc !== undefined) {
                var doc_1 = document;
                return fetch("/docs-content/" + this.doc)
                    .then(function (response) { return response.text(); })
                    .then(function (data) {
                    _this.content = data;
                    var el = doc_1.createElement('div');
                    el.innerHTML = data;
                    var headerEl = el.querySelector('h1');
                    doc_1.title = (headerEl && headerEl.textContent + ' - Stencil') || 'Stencil';
                });
            }
        };
        AppMarked.prototype.render = function () {
            return [
                h("div", { class: "measure-lg", innerHTML: this.content })
            ];
        };
        Object.defineProperty(AppMarked, "is", {
            get: function () { return "app-marked"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppMarked, "properties", {
            get: function () {
                return {
                    "content": {
                        "state": true
                    },
                    "doc": {
                        "type": String,
                        "attr": "doc",
                        "watchCallbacks": ["fetchNewContent"]
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppMarked, "style", {
            get: function () { return "app-marked {\n  overflow: hidden; }"; },
            enumerable: true,
            configurable: true
        });
        return AppMarked;
    }());
    exports.AppMarked = AppMarked;
    Object.defineProperty(exports, '__esModule', { value: true });
});
