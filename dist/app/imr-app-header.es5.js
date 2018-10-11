var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
App.loadBundle('imr-app-header', ['exports', './chunk-2cf4fa8a.js'], function (exports, __chunk_1) {
    var h = window.App.h;
    var AppHeader = /** @class */ (function () {
        function AppHeader() {
        }
        AppHeader.prototype.handleResize = function () {
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
        AppHeader.prototype.componentDidLoad = function () {
            this.isMobileMenuShown = false;
        };
        AppHeader.prototype.showNav = function (e) {
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
        AppHeader.prototype.hideNav = function () {
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
        AppHeader.prototype.render = function () {
            var _this = this;
            return (h("div", { class: "container" }, h("div", { class: "header-menu" }, h("stencil-route-link", { url: "/words", exact: true, onClick: function () { _this.hideNav(); } }, "My Words"), h("stencil-route-link", { url: "/settings", exact: true, onClick: function () { _this.hideNav(); } }, "Settings"), h("stencil-route-link", { url: "/", exact: true, onClick: function () { _this.hideNav(); } }, "Immerse"), h("a", { class: "link--external", target: "_blank", href: "https://paypal.com" }, "Donate ", h("app-icon", { name: "targetblank" })), h("div", { class: "header-close", onClick: function () { _this.hideNav(); } }, h("app-icon", { name: "close" })))));
        };
        Object.defineProperty(AppHeader, "is", {
            get: function () { return "imr-app-header"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppHeader, "properties", {
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
        Object.defineProperty(AppHeader, "listeners", {
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
        Object.defineProperty(AppHeader, "style", {
            get: function () { return "translate-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  background-color: #fff;\n  z-index: 99; }\n  translate-header .logo {\n    width: 96px; }\n  translate-header .container {\n    padding-top: 20px;\n    padding-bottom: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  \@media screen and (max-width: 768px) {\n    translate-header .container {\n      padding-top: 15px;\n      padding-bottom: 15px;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; } }\n\n.header-menu a {\n  -webkit-transition: border .3s, color .3s;\n  transition: border .3s, color .3s;\n  font-size: 14px;\n  padding-bottom: 1em;\n  border-bottom: 3px solid transparent;\n  vertical-align: top;\n  color: #8888A2;\n  text-decoration: none;\n  font-weight: 500;\n  letter-spacing: -0.02em; }\n\n.header-menu stencil-route-link + stencil-route-link,\n.header-menu stencil-route-link + a {\n  margin-left: 30px; }\n\n.header-menu a:not(.link--external):hover,\n.header-menu a.link-active {\n  border-bottom-color: rgba(136, 136, 162, 0.2); }\n\n.header-menu a.link-active {\n  color: #505061; }\n\n.header-menu .link--external .icon {\n  -webkit-transition: top 0.2s, left 0.2s;\n  transition: top 0.2s, left 0.2s;\n  position: relative; }\n\n.header-menu .link--external:hover {\n  color: #505061; }\n  .header-menu .link--external:hover .icon {\n    left: 1px;\n    top: -1px; }\n\n.header-overflow,\n.header-close {\n  -webkit-transition: opacity 0.3s;\n  transition: opacity 0.3s;\n  width: 22px;\n  height: 18px;\n  cursor: pointer;\n  opacity: 0.5; }\n  .header-overflow:hover,\n  .header-close:hover {\n    opacity: 1; }\n  \@media screen and (max-width: 768px) {\n    .header-overflow,\n    .header-close {\n      display: block;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center; } }\n\n.header-close .icon-close {\n  fill: #fff; }"; },
            enumerable: true,
            configurable: true
        });
        return AppHeader;
    }());
    var AppRoot = /** @class */ (function () {
        function AppRoot() {
            this.elements = [
                'site-header',
                'site-menu',
                'app-burger',
                '.root'
            ];
        }
        AppRoot.prototype.handleResize = function () {
            var _this = this;
            requestAnimationFrame(function () {
                if (window.innerWidth > 768 && _this.isLeftSidebarIn) {
                    _this.isLeftSidebarIn = false;
                    document.body.classList.remove('no-scroll');
                    _this.elements.forEach(function (el) {
                        _this.el.querySelector(el).classList.remove('left-sidebar-in');
                    });
                }
            });
        };
        AppRoot.prototype.componentDidLoad = function () {
            this.isLeftSidebarIn = false;
        };
        AppRoot.prototype.render = function () {
            return [
                h("imr-app-header", null),
                h("div", { class: "root" }, h("div", { class: "container" }, h("stencil-router", null, h("stencil-route", { routeRender: function (props) {
                        try {
                            console.log(props);
                            return (h("stencil-route-switch", null, h("stencil-route", { url: "/words", component: "imr-view-word-list" }), h("stencil-route", { url: "/settings", component: "pwas-page" }), h("stencil-route", { component: "imr-view-main" })));
                        }
                        catch (e) {
                            console.log(e);
                        }
                    } }))), ",", h("footer", null, h("div", { class: "container" }, h("div", { class: "footer__open-source" }, h("p", null, "Made by Manuel Puentes @2018")), h("div", { class: "footer__icons" }, h("a", { class: "svg-button", id: "stencil-twitter", href: "https://twitter.com/stenciljs", target: "_blank", rel: "noopener", title: "Follow me on " }, h("app-icon", { name: "twitter" })), h("a", { class: "svg-button", id: "ionic-forum", href: "https://stencil-worldwide.herokuapp.com", target: "_blank", rel: "noopener", title: "Join the stencil worldwide slack" }, h("app-icon", { name: "slack" }))))))
            ];
        };
        Object.defineProperty(AppRoot, "is", {
            get: function () { return "imr-app-root"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppRoot, "properties", {
            get: function () {
                return {
                    "el": {
                        "elementRef": true
                    },
                    "isLeftSidebarIn": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppRoot, "listeners", {
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
        Object.defineProperty(AppRoot, "style", {
            get: function () { return "* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n  *::-moz-selection, *::-moz-selection {\n    background: #EBEBF7; }\n  *::selection, *::-moz-selection {\n    background: #EBEBF7; }\n\nstencil-route-link:hover {\n  cursor: pointer; }\n\napp-root {\n  min-height: 100%;\n  display: block; }\n\n.no-scroll {\n  overflow: hidden; }\n\n.left-sidebar-in {\n  -webkit-animation-name: slideIn;\n  animation-name: slideIn;\n  -webkit-animation-duration: 0.7s;\n  animation-duration: 0.7s;\n  -webkit-animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);\n  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n\@-webkit-keyframes slideIn {\n  from {\n    left: 0; }\n  to {\n    left: calc(100vw - 56px); } }\n\n\@keyframes slideIn {\n  from {\n    left: 0; }\n  to {\n    left: calc(100vw - 56px); } }\n\n.left-sidebar-out {\n  -webkit-animation-name: slideOut;\n  animation-name: slideOut;\n  -webkit-animation-duration: 0.7s;\n  animation-duration: 0.7s;\n  -webkit-animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);\n  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n\n\@-webkit-keyframes slideOut {\n  from {\n    left: calc(100vw - 56px); }\n  to {\n    left: 0; } }\n\n\@keyframes slideOut {\n  from {\n    left: calc(100vw - 56px); }\n  to {\n    left: 0; } }\n\n.container {\n  width: 100%;\n  max-width: 1080px;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 1em;\n  -webkit-box-flex: 1;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto; }\n\n.root {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding: 6em 0 0; }\n\nfooter {\n  width: 100%;\n  background: #f8f8fc;\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 6em;\n  flex: 0 0 6em;\n  margin-top: 100px;\n  padding: 40px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  footer .container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center; }\n  footer .svg-button {\n    margin-left: 16px;\n    -webkit-transition: all .15s ease;\n    transition: all .15s ease; }\n  footer .svg-button:hover {\n    opacity: 0.5; }\n\n.footer__icons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.footer__open-source img {\n  width: 50%; }\n\n.footer__open-source p {\n  margin-top: 0;\n  margin-bottom: 0;\n  color: #abb2bf;\n  font-size: 10px; }"; },
            enumerable: true,
            configurable: true
        });
        return AppRoot;
    }());
    /**
      * @name Route
      * @module ionic
      * @description
     */
    var Route = /** @class */ (function () {
        function Route() {
            this.group = null;
            this.groupMatch = null;
            this.componentUpdated = null;
            this.match = null;
            this.unsubscribe = function () { return; };
            this.componentProps = {};
            this.exact = false;
            this.routeRender = null;
            this.scrollTopOffset = null;
            this.scrollOnNextRender = false;
            this.previousMatch = null;
        }
        // Identify if the current route is a match.
        Route.prototype.computeMatch = function () {
            this.previousMatch = this.match;
            if (!this.group) {
                return this.match = __chunk_1.matchPath(this.location.pathname, {
                    path: this.url,
                    exact: this.exact,
                    strict: true
                });
            }
            // If this already matched then lets check if it still matches the
            // updated location.
            if (this.groupMatch) {
                return this.match = __chunk_1.matchPath(this.location.pathname, {
                    path: this.url,
                    exact: this.exact,
                    strict: true
                });
            }
        };
        Route.prototype.componentDidUpdate = function () {
            var _this = this;
            // Wait for all children to complete rendering before calling componentUpdated
            Promise.all(Array.from(this.el.children).map(function (element) {
                if (element.componentOnReady) {
                    return element.componentOnReady();
                }
                return Promise.resolve(element);
            }))
                .then(function () {
                // After all children have completed then tell switch
                // the provided callback will get executed after this route is in view
                if (typeof _this.componentUpdated === 'function') {
                    _this.componentUpdated({
                        scrollTopOffset: _this.scrollTopOffset
                    });
                    // If this is an independent route and it matches then routes have updated.
                    // If the only change to location is a hash change then do not scroll.
                }
                else if (_this.match && !__chunk_1.matchesAreEqual(_this.match, _this.previousMatch)) {
                    _this.routeViewsUpdated({
                        scrollTopOffset: _this.scrollTopOffset
                    });
                }
            });
        };
        Route.prototype.render = function () {
            // If there is no activeRouter then do not render
            // Check if this route is in the matching URL (for example, a parent route)
            if (!this.match) {
                return null;
            }
            // component props defined in route
            // the history api
            // current match data including params
            var childProps = Object.assign({}, this.componentProps, { history: this.history, match: this.match });
            // If there is a routerRender defined then use
            // that and pass the component and component props with it.
            if (this.routeRender) {
                return this.routeRender(Object.assign({}, childProps, { component: this.component }));
            }
            if (this.component) {
                var ChildComponent = this.component;
                return (h(ChildComponent, Object.assign({}, childProps)));
            }
        };
        Object.defineProperty(Route, "is", {
            get: function () { return "stencil-route"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Route, "properties", {
            get: function () {
                return {
                    "component": {
                        "type": String,
                        "attr": "component"
                    },
                    "componentProps": {
                        "type": "Any",
                        "attr": "component-props"
                    },
                    "componentUpdated": {
                        "type": "Any",
                        "attr": "component-updated"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "exact": {
                        "type": Boolean,
                        "attr": "exact"
                    },
                    "group": {
                        "type": String,
                        "attr": "group"
                    },
                    "groupMatch": {
                        "type": "Any",
                        "attr": "group-match"
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
                    },
                    "historyType": {
                        "type": String,
                        "attr": "history-type"
                    },
                    "location": {
                        "type": "Any",
                        "attr": "location",
                        "watchCallbacks": ["computeMatch"]
                    },
                    "match": {
                        "state": true
                    },
                    "routeRender": {
                        "type": "Any",
                        "attr": "route-render"
                    },
                    "routeViewsUpdated": {
                        "type": "Any",
                        "attr": "route-views-updated"
                    },
                    "scrollTopOffset": {
                        "type": Number,
                        "attr": "scroll-top-offset"
                    },
                    "url": {
                        "type": String,
                        "attr": "url"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Route, "style", {
            get: function () { return "stencil-route.inactive {\n  display: none;\n}"; },
            enumerable: true,
            configurable: true
        });
        return Route;
    }());
    __chunk_1.ActiveRouter.injectProps(Route, [
        'location',
        'history',
        'historyType',
        'routeViewsUpdated'
    ]);
    function uuidv4() {
        return ([1e7].toString() + -1e3.toString() + -4e3.toString() + -8e3.toString() + -1e11.toString()).replace(/[018]/g, function (c) {
            var random = window.crypto.getRandomValues(new Uint8Array(1));
            return (c ^ random[0] & 15 >> c / 4).toString(16);
        });
    }
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function getUniqueId() {
        if (window.crypto) {
            return uuidv4();
        }
        return (Math.random() * 10e16).toString().match(/.{4}/g).join('-');
    }
    function getMatch(pathname, url, exact) {
        return __chunk_1.matchPath(pathname, {
            path: url,
            exact: exact,
            strict: true
        });
    }
    var RouteSwitch = /** @class */ (function () {
        function RouteSwitch() {
            this.group = getUniqueId();
            this.scrollTopOffset = null;
            this.activeIndex = null;
        }
        RouteSwitch.prototype.componentWillLoad = function () {
            this.regenerateSubscribers(this.location);
        };
        RouteSwitch.prototype.regenerateSubscribers = function (newLocation) {
            return __awaiter(this, void 0, void 0, function () {
                var newActiveIndex;
                var _this = this;
                return __generator(this, function (_a) {
                    newActiveIndex = null;
                    this.subscribers = Array.from(this.el.children)
                        .map(function (childElement, index) {
                        var match = getMatch(newLocation.pathname, childElement.url, childElement.exact);
                        if (match && newActiveIndex === null) {
                            newActiveIndex = index;
                        }
                        return {
                            el: childElement,
                            match: match
                        };
                    });
                    // Check if this actually changes which child is active
                    // then just pass the new match down if the active route isn't changing.
                    if (this.activeIndex === newActiveIndex) {
                        this.subscribers[this.activeIndex].el.groupMatch = this.subscribers[this.activeIndex].match;
                        return [2 /*return*/];
                    }
                    this.activeIndex = newActiveIndex;
                    // Set all props on the new active route then wait until it says that it
                    // is completed
                    new Promise(function (resolve) {
                        var activeChild = _this.subscribers[_this.activeIndex];
                        activeChild.el.scrollTopOffset = _this.scrollTopOffset;
                        activeChild.el.group = _this.group;
                        activeChild.el.groupMatch = activeChild.match;
                        activeChild.el.componentUpdated = resolve;
                    })
                        .then(function (routeViewUpdatedOptions) {
                        // After the new active route has completed then update visibility of routes
                        _this.queue.write(function () {
                            _this.subscribers.forEach(function (child, index) {
                                child.el.componentUpdated = null;
                                if (index === _this.activeIndex) {
                                    return child.el.style.display = null;
                                }
                                child.el.scrollTopOffset = _this.scrollTopOffset;
                                child.el.group = _this.group;
                                child.el.groupMatch = null;
                                child.el.style.display = 'none';
                            });
                        });
                        _this.routeViewsUpdated(Object.assign({ scrollTopOffset: _this.scrollTopOffset }, routeViewUpdatedOptions));
                    });
                    return [2 /*return*/];
                });
            });
        };
        RouteSwitch.prototype.render = function () {
            return (h("slot", null));
        };
        Object.defineProperty(RouteSwitch, "is", {
            get: function () { return "stencil-route-switch"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouteSwitch, "properties", {
            get: function () {
                return {
                    "el": {
                        "elementRef": true
                    },
                    "group": {
                        "type": String,
                        "attr": "group",
                        "reflectToAttr": true
                    },
                    "location": {
                        "type": "Any",
                        "attr": "location",
                        "watchCallbacks": ["regenerateSubscribers"]
                    },
                    "queue": {
                        "context": "queue"
                    },
                    "routeViewsUpdated": {
                        "type": "Any",
                        "attr": "route-views-updated"
                    },
                    "scrollTopOffset": {
                        "type": Number,
                        "attr": "scroll-top-offset"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return RouteSwitch;
    }());
    __chunk_1.ActiveRouter.injectProps(RouteSwitch, [
        'location',
        'routeViewsUpdated'
    ]);
    function invariant(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            console.error.apply(console, args);
        }
    }
    function warning(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            console.warn.apply(console, args);
        }
    }
    // Adapted from the https://github.com/ReactTraining/history and converted to TypeScript
    var createTransitionManager = function () {
        var prompt;
        var setPrompt = function (nextPrompt) {
            warning(prompt == null, 'A history supports only one prompt at a time');
            prompt = nextPrompt;
            return function () {
                if (prompt === nextPrompt) {
                    prompt = null;
                }
            };
        };
        var confirmTransitionTo = function (location, action, getUserConfirmation, callback) {
            // TODO: If another transition starts while we're still confirming
            // the previous one, we may end up in a weird state. Figure out the
            // best way to handle this.
            if (prompt != null) {
                var result = typeof prompt === 'function' ? prompt(location, action) : prompt;
                if (typeof result === 'string') {
                    if (typeof getUserConfirmation === 'function') {
                        getUserConfirmation(result, callback);
                    }
                    else {
                        warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message');
                        callback(true);
                    }
                }
                else {
                    // Return false from a transition hook to cancel the transition.
                    callback(result !== false);
                }
            }
            else {
                callback(true);
            }
        };
        var listeners = [];
        var appendListener = function (fn) {
            var isActive = true;
            var listener = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (isActive) {
                    fn.apply(void 0, args);
                }
            };
            listeners.push(listener);
            return function () {
                isActive = false;
                listeners = listeners.filter(function (item) { return item !== listener; });
            };
        };
        var notifyListeners = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            listeners.forEach(function (listener) { return listener.apply(void 0, args); });
        };
        return {
            setPrompt: setPrompt,
            confirmTransitionTo: confirmTransitionTo,
            appendListener: appendListener,
            notifyListeners: notifyListeners
        };
    };
    var createScrollHistory = function (applicationScrollKey) {
        if (applicationScrollKey === void 0) { applicationScrollKey = 'scrollPositions'; }
        var scrollPositions = new Map();
        if (__chunk_1.storageAvailable('sessionStorage')) {
            scrollPositions = window.sessionStorage.getItem(applicationScrollKey) ?
                new Map(JSON.parse(window.sessionStorage.getItem(applicationScrollKey))) :
                scrollPositions;
        }
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        function set(key, value) {
            scrollPositions.set(key, value);
            if (__chunk_1.storageAvailable('sessionStorage')) {
                var arrayData_1 = [];
                scrollPositions.forEach(function (value, key) {
                    arrayData_1.push([key, value]);
                });
                window.sessionStorage.setItem('scrollPositions', JSON.stringify(arrayData_1));
            }
        }
        function get(key) {
            return scrollPositions.get(key);
        }
        function has(key) {
            return scrollPositions.has(key);
        }
        function capture(key) {
            set(key, [window.scrollX, window.scrollY]);
        }
        return {
            set: set,
            get: get,
            has: has,
            capture: capture
        };
    };
    // Adapted from the https://github.com/ReactTraining/history and converted to TypeScript
    var PopStateEvent = 'popstate';
    var HashChangeEvent = 'hashchange';
    var getHistoryState = function () {
        try {
            return window.history.state || {};
        }
        catch (e) {
            // IE 11 sometimes throws when accessing window.history.state
            // See https://github.com/ReactTraining/history/pull/289
            return {};
        }
    };
    /**
     * Creates a history object that uses the HTML5 history API including
     * pushState, replaceState, and the popstate event.
     */
    var createBrowserHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_1.canUseDOM, 'Browser history needs a DOM');
        var globalHistory = window.history;
        var canUseHistory = __chunk_1.supportsHistory();
        var needsHashChangeListener = !__chunk_1.supportsPopStateOnHashChange();
        var scrollHistory = createScrollHistory();
        var _a = props.forceRefresh, forceRefresh = _a === void 0 ? false : _a, _b = props.getUserConfirmation, getUserConfirmation = _b === void 0 ? __chunk_1.getConfirmation : _b, _c = props.keyLength, keyLength = _c === void 0 ? 6 : _c;
        var basename = props.basename ? __chunk_1.stripTrailingSlash(__chunk_1.addLeadingSlash(props.basename)) : '';
        var getDOMLocation = function (historyState) {
            historyState = historyState || {};
            var key = historyState.key, state = historyState.state;
            var _a = window.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
            var path = pathname + search + hash;
            warning((!basename || __chunk_1.hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = __chunk_1.stripBasename(path, basename);
            }
            return __chunk_1.createLocation(path, state, key);
        };
        var createKey = function () { return (Math.random().toString(36).substr(2, keyLength)); };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            // Capture location for the view before changing history.
            scrollHistory.capture(history.location.key);
            Object.assign(history, nextState);
            // Set scroll position based on its previous storage value
            history.location.scrollPosition = scrollHistory.get(history.location.key);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var handlePopState = function (event) {
            // Ignore extraneous popstate events in WebKit.
            if (__chunk_1.isExtraneousPopstateEvent(event)) {
                return;
            }
            handlePop(getDOMLocation(event.state));
        };
        var handleHashChange = function () {
            handlePop(getDOMLocation(getHistoryState()));
        };
        var forceNextPop = false;
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_1 = 'POP';
                transitionManager.confirmTransitionTo(location, action_1, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_1, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            // TODO: We could probably make this more reliable by
            // keeping a list of keys we've seen in sessionStorage.
            // Instead, we just default to 0 for keys we don't know.
            var toIndex = allKeys.indexOf(toLocation.key);
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allKeys.indexOf(fromLocation.key);
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        var initialLocation = getDOMLocation(getHistoryState());
        var allKeys = [initialLocation.key];
        // Public interface
        var createHref = function (location) {
            return basename + __chunk_1.createPath(location);
        };
        var push = function (path, state) {
            warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'PUSH';
            var location = __chunk_1.createLocation(path, state, createKey(), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.pushState({ key: key, state: state }, null, href);
                    if (forceRefresh) {
                        window.location.href = href;
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                        nextKeys.push(location.key);
                        allKeys = nextKeys;
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
                    window.location.href = href;
                }
            });
        };
        var replace = function (path, state) {
            warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'REPLACE';
            var location = __chunk_1.createLocation(path, state, createKey(), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.replaceState({ key: key, state: state }, null, href);
                    if (forceRefresh) {
                        window.location.replace(href);
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        if (prevIndex !== -1) {
                            allKeys[prevIndex] = location.key;
                        }
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
                    window.location.replace(href);
                }
            });
        };
        var go = function (n) {
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_1.addEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_1.addEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
            else if (listenerCount === 0) {
                __chunk_1.removeEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_1.removeEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    // Adapted from the https://github.com/ReactTraining/history and converted to TypeScript
    var HashChangeEvent$1 = 'hashchange';
    var HashPathCoders = {
        hashbang: {
            encodePath: function (path) { return path.charAt(0) === '!' ? path : '!/' + __chunk_1.stripLeadingSlash(path); },
            decodePath: function (path) { return path.charAt(0) === '!' ? path.substr(1) : path; }
        },
        noslash: {
            encodePath: __chunk_1.stripLeadingSlash,
            decodePath: __chunk_1.addLeadingSlash
        },
        slash: {
            encodePath: __chunk_1.addLeadingSlash,
            decodePath: __chunk_1.addLeadingSlash
        }
    };
    var getHashPath = function () {
        // We can't use window.location.hash here because it's not
        // consistent across browsers - Firefox will pre-decode it!
        var href = window.location.href;
        var hashIndex = href.indexOf('#');
        return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
    };
    var pushHashPath = function (path) { return (window.location.hash = path); };
    var replaceHashPath = function (path) {
        var hashIndex = window.location.href.indexOf('#');
        window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
    };
    var createHashHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_1.canUseDOM, 'Hash history needs a DOM');
        var globalHistory = window.history;
        var canGoWithoutReload = __chunk_1.supportsGoWithoutReloadUsingHash();
        var _a = props.getUserConfirmation, getUserConfirmation = _a === void 0 ? __chunk_1.getConfirmation : _a, _b = props.hashType, hashType = _b === void 0 ? 'slash' : _b;
        var basename = props.basename ? __chunk_1.stripTrailingSlash(__chunk_1.addLeadingSlash(props.basename)) : '';
        var _c = HashPathCoders[hashType], encodePath = _c.encodePath, decodePath = _c.decodePath;
        var getDOMLocation = function () {
            var path = decodePath(getHashPath());
            warning((!basename || __chunk_1.hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = __chunk_1.stripBasename(path, basename);
            }
            return __chunk_1.createLocation(path);
        };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            Object.assign(history, nextState);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var forceNextPop = false;
        var ignorePath = null;
        var handleHashChange = function () {
            var path = getHashPath();
            var encodedPath = encodePath(path);
            if (path !== encodedPath) {
                // Ensure we always have a properly-encoded hash.
                replaceHashPath(encodedPath);
            }
            else {
                var location = getDOMLocation();
                var prevLocation = history.location;
                if (!forceNextPop && __chunk_1.locationsAreEqual(prevLocation, location)) {
                    return; // A hashchange doesn't always == location change.
                }
                if (ignorePath === __chunk_1.createPath(location)) {
                    return; // Ignore this change; we already setState in push/replace.
                }
                ignorePath = null;
                handlePop(location);
            }
        };
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_2 = 'POP';
                transitionManager.confirmTransitionTo(location, action_2, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_2, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            // TODO: We could probably make this more reliable by
            // keeping a list of paths we've seen in sessionStorage.
            // Instead, we just default to 0 for paths we don't know.
            var toIndex = allPaths.lastIndexOf(__chunk_1.createPath(toLocation));
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allPaths.lastIndexOf(__chunk_1.createPath(fromLocation));
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        // Ensure the hash is encoded properly before doing anything else.
        var path = getHashPath();
        var encodedPath = encodePath(path);
        if (path !== encodedPath) {
            replaceHashPath(encodedPath);
        }
        var initialLocation = getDOMLocation();
        var allPaths = [__chunk_1.createPath(initialLocation)];
        // Public interface
        var createHref = function (location) { return ('#' + encodePath(basename + __chunk_1.createPath(location))); };
        var push = function (path, state) {
            warning(state === undefined, 'Hash history cannot push state; it is ignored');
            var action = 'PUSH';
            var location = __chunk_1.createLocation(path, undefined, undefined, history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = __chunk_1.createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a PUSH, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    pushHashPath(encodedPath);
                    var prevIndex = allPaths.lastIndexOf(__chunk_1.createPath(history.location));
                    var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextPaths.push(path);
                    allPaths = nextPaths;
                    setState({ action: action, location: location });
                }
                else {
                    warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
                    setState();
                }
            });
        };
        var replace = function (path, state) {
            warning(state === undefined, 'Hash history cannot replace state; it is ignored');
            var action = 'REPLACE';
            var location = __chunk_1.createLocation(path, undefined, undefined, history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = __chunk_1.createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a REPLACE, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    replaceHashPath(encodedPath);
                }
                var prevIndex = allPaths.indexOf(__chunk_1.createPath(history.location));
                if (prevIndex !== -1) {
                    allPaths[prevIndex] = path;
                }
                setState({ action: action, location: location });
            });
        };
        var go = function (n) {
            warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_1.addEventListener(window, HashChangeEvent$1, handleHashChange);
            }
            else if (listenerCount === 0) {
                __chunk_1.removeEventListener(window, HashChangeEvent$1, handleHashChange);
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var HISTORIES = {
        'browser': createBrowserHistory,
        'hash': createHashHistory
    };
    /**
      * @name Router
      * @module ionic
      * @description
     */
    var Router = /** @class */ (function () {
        function Router() {
            var _this = this;
            this.root = '/';
            this.historyType = 'browser';
            // A suffix to append to the page title whenever
            // it's updated through RouteTitle
            this.titleSuffix = '';
            this.scrollTopOffset = null;
            this.routeViewsUpdated = function (options) {
                if (options === void 0) { options = {}; }
                _this.scrollTo(options.scrollTopOffset || _this.scrollTopOffset);
            };
        }
        Router.prototype.componentWillLoad = function () {
            var _this = this;
            this.history = HISTORIES[this.historyType]();
            this.history.listen(function (location) { return __awaiter$1(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    location = this.getLocation(location);
                    this.location = location;
                    return [2 /*return*/];
                });
            }); });
            this.location = this.getLocation(this.history.location);
        };
        Router.prototype.scrollTo = function (scrollToLocation) {
            var _this = this;
            if (scrollToLocation == null || this.isServer || !this.history) {
                return;
            }
            if (this.history.action === 'POP' && this.history.location.scrollPosition != null) {
                return this.queue.write(function () {
                    window.scrollTo(_this.history.location.scrollPosition[0], _this.history.location.scrollPosition[1]);
                });
            }
            // okay, the frame has passed. Go ahead and render now
            return this.queue.write(function () {
                window.scrollTo(0, scrollToLocation);
            });
        };
        Router.prototype.getLocation = function (location) {
            // Remove the root URL if found at beginning of string
            var pathname = location.pathname.indexOf(this.root) == 0 ?
                '/' + location.pathname.slice(this.root.length) :
                location.pathname;
            return Object.assign({}, location, { pathname: pathname });
        };
        Router.prototype.render = function () {
            var state = {
                historyType: this.historyType,
                location: this.location,
                titleSuffix: this.titleSuffix,
                root: this.root,
                history: this.history,
                routeViewsUpdated: this.routeViewsUpdated
            };
            return (h(__chunk_1.ActiveRouter.Provider, { state: state }, h("slot", null)));
        };
        Object.defineProperty(Router, "is", {
            get: function () { return "stencil-router"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Router, "properties", {
            get: function () {
                return {
                    "history": {
                        "state": true
                    },
                    "historyType": {
                        "type": String,
                        "attr": "history-type"
                    },
                    "isServer": {
                        "context": "isServer"
                    },
                    "location": {
                        "state": true
                    },
                    "queue": {
                        "context": "queue"
                    },
                    "root": {
                        "type": String,
                        "attr": "root"
                    },
                    "scrollTopOffset": {
                        "type": Number,
                        "attr": "scroll-top-offset"
                    },
                    "titleSuffix": {
                        "type": String,
                        "attr": "title-suffix"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return Router;
    }());
    exports.ImrAppHeader = AppHeader;
    exports.ImrAppRoot = AppRoot;
    exports.StencilRoute = Route;
    exports.StencilRouteSwitch = RouteSwitch;
    exports.StencilRouter = Router;
    Object.defineProperty(exports, '__esModule', { value: true });
});
