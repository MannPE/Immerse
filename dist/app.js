/*!
 * Built with http://stenciljs.com
 * 2018-09-15T18:38:40
 */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "App","app",0,"app.core.js","app.core.pf.js","hydrated",[["app-burger","app-burger",1,[["el",7],["toggleLeftSidebar",1]]],["app-icon","app-icon",1,[["name",1,0,1,2]]],["app-marked","app-marked",1,[["content",5],["doc",1,0,1,2]]],["context-consumer","app-burger",0,[["context",1],["el",7],["renderer",1,0,1,1],["subscribe",1],["unsubscribe",5]]],["imr-app-header","imr-app-header",1,[["el",7],["isMobileMenuShown",5]],0,[["window:resize","handleResize",0,1]]],["imr-app-root","imr-app-header",1,[["el",7],["isLeftSidebarIn",5]],0,[["window:resize","handleResize",0,1]]],["imr-input","imr-input",1,[["description",1,0,1,2],["example",1,0,1,2],["word",1,0,1,2]]],["imr-language-card","imr-language-card",1,[["alt",1,0,1,2],["imgPath",1,0,"img-path",2],["name",1,0,1,2]]],["imr-language-list","imr-language-card",1],["imr-view-main","imr-input",1,[["el",7]]],["imr-view-settings","imr-view-settings",1],["imr-view-word-list","imr-view-word-list",1,[["_el",7],["loadWords",6],["setWords",6],["words",5]]],["imr-word-item","imr-view-word-list",1,[["_el",7],["ignoreWhiteSpace",1,0,"ignore-white-space",3],["insensitive",1,0,1,3],["singular",1,0,1,3],["translation",1,0,1,2],["type",1,0,1,2],["value",1,0,1,2]]],["lazy-iframe","lazy-iframe",1,[["el",7],["frameBorder",1,0,"frame-border",2],["height",1,0,1,2],["name",1,0,1,2],["realSrc",5],["scrolling",1,0,1,2],["src",1,0,1,2],["width",1,0,1,2]]],["notfound-page","notfound-page",1],["resources-page","lazy-iframe",1],["stencil-route","imr-app-header",1,[["component",1,0,1,2],["componentProps",1],["componentUpdated",1],["el",7],["exact",1,0,1,3],["group",1,0,1,2],["groupMatch",1],["history",1],["historyType",1,0,"history-type",2],["location",1],["match",5],["routeRender",1],["routeViewsUpdated",1],["scrollTopOffset",1,0,"scroll-top-offset",4],["url",1,0,1,2]]],["stencil-route-link","stencil-route-link",0,[["activeClass",1,0,"active-class",2],["anchorClass",1,0,"anchor-class",2],["anchorRole",1,0,"anchor-role",2],["anchorTabIndex",1,0,"anchor-tab-index",2],["anchorTitle",1,0,"anchor-title",2],["custom",1,0,1,2],["el",7],["exact",1,0,1,3],["history",1],["location",1],["match",5],["root",1,0,1,2],["strict",1,0,1,3],["url",1,0,1,2],["urlMatch",1,0,"url-match",2]]],["stencil-route-switch","imr-app-header",0,[["el",7],["group",1,0,1,2],["location",1],["queue",3,0,0,0,"queue"],["routeViewsUpdated",1],["scrollTopOffset",1,0,"scroll-top-offset",4]]],["stencil-router","imr-app-header",0,[["history",5],["historyType",1,0,"history-type",2],["isServer",3,0,0,0,"isServer"],["location",5],["queue",3,0,0,0,"queue"],["root",1,0,1,2],["scrollTopOffset",1,0,"scroll-top-offset",4],["titleSuffix",1,0,"title-suffix",2]]]],HTMLElement.prototype);