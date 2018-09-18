/*! Built with http://stenciljs.com */
import { h } from './app.core.js';
var NotFoundPage = /** @class */ (function () {
    function NotFoundPage() {
    }
    NotFoundPage.prototype.render = function () {
        return (h("div", null, h("h1", null, "Uh oh! We can't find the page your looking for."), h("p", null, h("stencil-route-link", { url: '/', class: 'block' }, "Head back to the home page"))));
    };
    Object.defineProperty(NotFoundPage, "is", {
        get: function () { return "notfound-page"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotFoundPage, "style", {
        get: function () { return "notfound-page {\n  text-align: center; }"; },
        enumerable: true,
        configurable: true
    });
    return NotFoundPage;
}());
export { NotFoundPage as NotfoundPage };