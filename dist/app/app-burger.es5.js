/*! Built with http://stenciljs.com */
App.loadBundle('app-burger', ['exports'], function (exports) {
    var h = window.App.h;
    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    };
    function defaultConsumerRender(subscribe, child) {
        return h("context-consumer", { subscribe: subscribe, renderer: child });
    }
    function createProviderConsumer(defaultState, consumerRender) {
        if (consumerRender === void 0) { consumerRender = defaultConsumerRender; }
        var listeners = new Map();
        var currentState = defaultState;
        function notifyConsumers() {
            listeners.forEach(updateListener);
        }
        function updateListener(fields, listener) {
            if (Array.isArray(fields)) {
                fields.slice().forEach(function (fieldName) {
                    listener[fieldName] = currentState[fieldName];
                });
            }
            else {
                listener[fields] = Object.assign({}, currentState);
            }
            listener.forceUpdate();
        }
        function attachListener(propList) {
            return function (el) {
                if (listeners.has(el)) {
                    return;
                }
                listeners.set(el, propList);
                updateListener(propList, el);
            };
        }
        function subscribe(el, propList) {
            attachListener(propList)(el);
            return function () {
                listeners.delete(el);
            };
        }
        function Provider(_b) {
            var state = _b.state, children = _b.children;
            currentState = state;
            notifyConsumers();
            return children;
        }
        function Consumer(_b) {
            var children = _b.children;
            return consumerRender(subscribe, children[0]);
        }
        function wrapConsumer(childComponent, fieldList) {
            var Child = childComponent.is;
            return function (_a) {
                var children = _a.children, props = __rest(_a, ["children"]);
                return (h(Child, Object.assign({ ref: attachListener(fieldList) }, props), children));
            };
        }
        function injectProps(childComponent, fieldList) {
            var unsubscribe = null;
            var prevComponentWillLoad = childComponent.prototype.componentWillLoad;
            childComponent.prototype.componentWillLoad = function () {
                unsubscribe = subscribe(this.el, fieldList);
                if (prevComponentWillLoad) {
                    return prevComponentWillLoad.bind(this)();
                }
            };
            var prevComponentDidUnload = childComponent.prototype.componentDidUnload;
            childComponent.prototype.componentDidUnload = function () {
                unsubscribe();
                if (prevComponentDidUnload) {
                    return prevComponentDidUnload.bind(this)();
                }
            };
        }
        return {
            Provider: Provider,
            Consumer: Consumer,
            wrapConsumer: wrapConsumer,
            injectProps: injectProps
        };
    }
    var SiteProviderConsumer = createProviderConsumer({
        isLeftSidebarIn: false,
        toggleLeftSidebar: function () { }
    }, function (subscribe, child) { return h("context-consumer", { subscribe: subscribe, renderer: child }); });
    var AppBurger = /** @class */ (function () {
        function AppBurger() {
            this.toggleLeftSidebar = function () { };
        }
        AppBurger.prototype.render = function () {
            var _this = this;
            return (h("div", { class: "burger", onClick: function () { return _this.toggleLeftSidebar(); } }, h("app-icon", { name: "menu" }), h("app-icon", { name: "close" })));
        };
        Object.defineProperty(AppBurger, "is", {
            get: function () { return "app-burger"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppBurger, "properties", {
            get: function () {
                return {
                    "el": {
                        "elementRef": true
                    },
                    "toggleLeftSidebar": {
                        "type": "Any",
                        "attr": "toggle-left-sidebar"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppBurger, "style", {
            get: function () { return "app-burger {\n  display: none;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  z-index: 999; }\n  app-burger > div {\n    padding: 18px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n    app-burger > div:hover app-icon {\n      opacity: 1; }\n  app-burger .icon-menu {\n    display: block; }\n  app-burger .icon-close {\n    display: none; }\n  app-burger app-icon {\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n    opacity: 0.7;\n    cursor: pointer; }\n  app-burger.left-sidebar-in > div {\n    height: 100vh;\n    padding-right: 50px; }\n  app-burger.left-sidebar-in .icon-menu {\n    display: none; }\n  app-burger.left-sidebar-in .icon-close {\n    display: block; }\n\n\@media screen and (max-width: 768px) {\n  app-burger {\n    display: block; } }"; },
            enumerable: true,
            configurable: true
        });
        return AppBurger;
    }());
    SiteProviderConsumer.injectProps(AppBurger, ['toggleLeftSidebar']);
    var ContextConsumer = /** @class */ (function () {
        function ContextConsumer() {
            this.context = {};
            this.renderer = function (props) {
                return null;
            };
        }
        ContextConsumer.prototype.componentWillLoad = function () {
            this.unsubscribe = this.subscribe(this.el, 'context');
        };
        ContextConsumer.prototype.componentDidUnload = function () {
            this.unsubscribe();
        };
        ContextConsumer.prototype.render = function () {
            return this.renderer(Object.assign({}, this.context));
        };
        Object.defineProperty(ContextConsumer, "is", {
            get: function () { return "context-consumer"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextConsumer, "properties", {
            get: function () {
                return {
                    "context": {
                        "type": "Any",
                        "attr": "context"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "renderer": {
                        "type": "Any",
                        "attr": "renderer"
                    },
                    "subscribe": {
                        "type": "Any",
                        "attr": "subscribe"
                    },
                    "unsubscribe": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return ContextConsumer;
    }());
    exports.AppBurger = AppBurger;
    exports.ContextConsumer = ContextConsumer;
    Object.defineProperty(exports, '__esModule', { value: true });
});
