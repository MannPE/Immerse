/*! Built with http://stenciljs.com */
import { h } from './app.core.js';
import { a as matchPath, u as isModifiedEvent, c as ActiveRouter } from './chunk-0844f48d.js';
/**
  * @name Route
  * @module ionic
  * @description
 */
var RouteLink = /** @class */ (function () {
    function RouteLink() {
        this.unsubscribe = function () { return; };
        this.activeClass = 'link-active';
        this.exact = false;
        this.strict = true;
        /**
         *  Custom tag to use instead of an anchor
         */
        this.custom = 'a';
        this.match = null;
    }
    RouteLink.prototype.componentWillLoad = function () {
        this.computeMatch();
    };
    // Identify if the current route is a match.
    RouteLink.prototype.computeMatch = function () {
        if (this.location) {
            this.match = matchPath(this.location.pathname, {
                path: this.urlMatch || this.url,
                exact: this.exact,
                strict: this.strict
            });
        }
    };
    RouteLink.prototype.handleClick = function (e) {
        if (isModifiedEvent(e)) {
            return;
        }
        e.preventDefault();
        return this.history.push(this.getUrl(this.url));
    };
    // Get the URL for this route link without the root from the router
    RouteLink.prototype.getUrl = function (url) {
        // Don't allow double slashes
        if (url.charAt(0) == '/' && this.root.charAt(this.root.length - 1) == '/') {
            return this.root.slice(0, this.root.length - 1) + url;
        }
        return this.root + url;
    };
    RouteLink.prototype.render = function () {
        var _a;
        var anchorAttributes = {
            class: (_a = {},
                _a[this.activeClass] = this.match !== null,
                _a),
            onClick: this.handleClick.bind(this)
        };
        if (this.anchorClass) {
            anchorAttributes.class[this.anchorClass] = true;
        }
        if (this.custom === 'a') {
            anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex });
        }
        return (h(this.custom, Object.assign({}, anchorAttributes), h("slot", null)));
    };
    Object.defineProperty(RouteLink, "is", {
        get: function () { return "stencil-route-link"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteLink, "properties", {
        get: function () {
            return {
                "activeClass": {
                    "type": String,
                    "attr": "active-class"
                },
                "anchorClass": {
                    "type": String,
                    "attr": "anchor-class"
                },
                "anchorRole": {
                    "type": String,
                    "attr": "anchor-role"
                },
                "anchorTabIndex": {
                    "type": String,
                    "attr": "anchor-tab-index"
                },
                "anchorTitle": {
                    "type": String,
                    "attr": "anchor-title"
                },
                "custom": {
                    "type": String,
                    "attr": "custom"
                },
                "el": {
                    "elementRef": true
                },
                "exact": {
                    "type": Boolean,
                    "attr": "exact"
                },
                "history": {
                    "type": "Any",
                    "attr": "history"
                },
                "location": {
                    "type": "Any",
                    "attr": "location",
                    "watchCallbacks": ["computeMatch"]
                },
                "match": {
                    "state": true
                },
                "root": {
                    "type": String,
                    "attr": "root"
                },
                "strict": {
                    "type": Boolean,
                    "attr": "strict"
                },
                "url": {
                    "type": String,
                    "attr": "url"
                },
                "urlMatch": {
                    "type": String,
                    "attr": "url-match"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return RouteLink;
}());
ActiveRouter.injectProps(RouteLink, [
    'history',
    'location',
    'root'
]);
export { RouteLink as StencilRouteLink };
