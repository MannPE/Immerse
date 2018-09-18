/*! Built with http://stenciljs.com */
const { h } = window.App;

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
function defaultConsumerRender(subscribe, child) {
    return h("context-consumer", { subscribe: subscribe, renderer: child });
}
function createProviderConsumer(defaultState, consumerRender = defaultConsumerRender) {
    let listeners = new Map();
    let currentState = defaultState;
    function notifyConsumers() {
        listeners.forEach(updateListener);
    }
    function updateListener(fields, listener) {
        if (Array.isArray(fields)) {
            [...fields].forEach(fieldName => {
                listener[fieldName] = currentState[fieldName];
            });
        }
        else {
            listener[fields] = Object.assign({}, currentState);
        }
        listener.forceUpdate();
    }
    function attachListener(propList) {
        return (el) => {
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
    function Provider({ state, children }) {
        currentState = state;
        notifyConsumers();
        return children;
    }
    function Consumer({ children }) {
        return consumerRender(subscribe, children[0]);
    }
    function wrapConsumer(childComponent, fieldList) {
        const Child = childComponent.is;
        return (_a) => {
            var { children } = _a, props = __rest(_a, ["children"]);
            return (h(Child, Object.assign({ ref: attachListener(fieldList) }, props), children));
        };
    }
    function injectProps(childComponent, fieldList) {
        let unsubscribe = null;
        const prevComponentWillLoad = childComponent.prototype.componentWillLoad;
        childComponent.prototype.componentWillLoad = function () {
            unsubscribe = subscribe(this.el, fieldList);
            if (prevComponentWillLoad) {
                return prevComponentWillLoad.bind(this)();
            }
        };
        const prevComponentDidUnload = childComponent.prototype.componentDidUnload;
        childComponent.prototype.componentDidUnload = function () {
            unsubscribe();
            if (prevComponentDidUnload) {
                return prevComponentDidUnload.bind(this)();
            }
        };
    }
    return {
        Provider,
        Consumer,
        wrapConsumer,
        injectProps
    };
}

var SiteProviderConsumer = createProviderConsumer({
    isLeftSidebarIn: false,
    toggleLeftSidebar: () => { }
}, (subscribe, child) => h("context-consumer", { subscribe: subscribe, renderer: child }));

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

class ContextConsumer {
    constructor() {
        this.context = {};
        this.renderer = (props) => {
            return null;
        };
    }
    componentWillLoad() {
        this.unsubscribe = this.subscribe(this.el, 'context');
    }
    componentDidUnload() {
        this.unsubscribe();
    }
    render() {
        return this.renderer(Object.assign({}, this.context));
    }
    static get is() { return "context-consumer"; }
    static get properties() { return {
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
    }; }
}

export { AppBurger, ContextConsumer };
