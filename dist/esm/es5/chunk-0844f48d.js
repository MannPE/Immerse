/*! Built with http://stenciljs.com */
import { h } from "./app.core.js";
var DEFAULT_DELIMITER = "/", DEFAULT_DELIMITERS = "./", PATH_REGEXP = new RegExp(["(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"), "g");
function parse(e, t) { for (var n, r = [], a = 0, s = 0, i = "", o = t && t.delimiter || DEFAULT_DELIMITER, c = t && t.delimiters || DEFAULT_DELIMITERS, u = !1; null !== (n = PATH_REGEXP.exec(e));) {
    var l = n[0], p = n[1], h = n.index;
    if (i += e.slice(s, h), s = h + l.length, p)
        i += p[1], u = !0;
    else {
        var f = "", d = e[s], g = n[2], m = n[3], v = n[4], E = n[5];
        if (!u && i.length) {
            var y = i.length - 1;
            c.indexOf(i[y]) > -1 && (f = i[y], i = i.slice(0, y));
        }
        i && (r.push(i), i = "", u = !1);
        var x = "" !== f && void 0 !== d && d !== f, A = "+" === E || "*" === E, O = "?" === E || "*" === E, b = f || o, R = m || v;
        r.push({ name: g || a++, prefix: f, delimiter: b, optional: O, repeat: A, partial: x, pattern: R ? escapeGroup(R) : "[^" + escapeString(b) + "]+?" });
    }
} return (i || s < e.length) && r.push(i + e.substr(s)), r; }
function escapeString(e) { return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"); }
function escapeGroup(e) { return e.replace(/([=!:$/()])/g, "\\$1"); }
function flags(e) { return e && e.sensitive ? "" : "i"; }
function regexpToRegexp(e, t) { if (!t)
    return e; var n = e.source.match(/\((?!\?)/g); if (n)
    for (var r = 0; r < n.length; r++)
        t.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, pattern: null }); return e; }
function arrayToRegexp(e, t, n) { for (var r = [], a = 0; a < e.length; a++)
    r.push(pathToRegexp(e[a], t, n).source); return new RegExp("(?:" + r.join("|") + ")", flags(n)); }
function stringToRegexp(e, t, n) { return tokensToRegExp(parse(e, n), t, n); }
function tokensToRegExp(e, t, n) { for (var r = (n = n || {}).strict, a = !1 !== n.end, s = escapeString(n.delimiter || DEFAULT_DELIMITER), i = n.delimiters || DEFAULT_DELIMITERS, o = [].concat(n.endsWith || []).map(escapeString).concat("$").join("|"), c = "", u = !1, l = 0; l < e.length; l++) {
    var p = e[l];
    if ("string" == typeof p)
        c += escapeString(p), u = l === e.length - 1 && i.indexOf(p[p.length - 1]) > -1;
    else {
        var h = escapeString(p.prefix), f = p.repeat ? "(?:" + p.pattern + ")(?:" + h + "(?:" + p.pattern + "))*" : p.pattern;
        t && t.push(p), p.optional ? p.partial ? c += h + "(" + f + ")?" : c += "(?:" + h + "(" + f + "))?" : c += h + "(" + f + ")";
    }
} return a ? (r || (c += "(?:" + s + ")?"), c += "$" === o ? "$" : "(?=" + o + ")") : (r || (c += "(?:" + s + "(?=" + o + "))?"), u || (c += "(?=" + s + "|" + o + ")")), new RegExp("^" + c, flags(n)); }
function pathToRegexp(e, t, n) { return e instanceof RegExp ? regexpToRegexp(e, t) : Array.isArray(e) ? arrayToRegexp(e, t, n) : stringToRegexp(e, t, n); }
function hasBasename(e, t) { return new RegExp("^" + t + "(\\/|\\?|#|$)", "i").test(e); }
function stripBasename(e, t) { return hasBasename(e, t) ? e.substr(t.length) : e; }
function stripTrailingSlash(e) { return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e; }
function addLeadingSlash(e) { return "/" === e.charAt(0) ? e : "/" + e; }
function stripLeadingSlash(e) { return "/" === e.charAt(0) ? e.substr(1) : e; }
function parsePath(e) { var t = e || "/", n = "", r = ""; var a = t.indexOf("#"); -1 !== a && (r = t.substr(a), t = t.substr(0, a)); var s = t.indexOf("?"); return -1 !== s && (n = t.substr(s), t = t.substr(0, s)), { pathname: t, search: "?" === n ? "" : n, hash: "#" === r ? "" : r }; }
function createPath(e) { var t = e.pathname, n = e.search, r = e.hash; var a = t || "/"; return n && "?" !== n && (a += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (a += "#" === r.charAt(0) ? r : "#" + r), a; }
function parseQueryString(e) { return e ? (/^[?#]/.test(e) ? e.slice(1) : e).split("&").reduce(function (e, t) { var _a = t.split("="), n = _a[0], r = _a[1]; return e[n] = r ? decodeURIComponent(r.replace(/\+/g, " ")) : "", e; }, {}) : {}; }
function isAbsolute(e) { return "/" === e.charAt(0); }
function spliceOne(e, t) { for (var n = t, r = n + 1, a = e.length; r < a; n += 1, r += 1)
    e[n] = e[r]; e.pop(); }
function resolvePathname(e, t) {
    if (t === void 0) { t = ""; }
    var n = e && e.split("/") || [];
    var r = t && t.split("/") || [];
    var a = e && isAbsolute(e), s = t && isAbsolute(t), i = a || s;
    if (e && isAbsolute(e) ? r = n : n.length && (r.pop(), r = r.concat(n)), !r.length)
        return "/";
    var o;
    if (r.length) {
        var e_1 = r[r.length - 1];
        o = "." === e_1 || ".." === e_1 || "" === e_1;
    }
    else
        o = !1;
    var c = 0;
    for (var e_2 = r.length; e_2 >= 0; e_2--) {
        var t_1 = r[e_2];
        "." === t_1 ? spliceOne(r, e_2) : ".." === t_1 ? (spliceOne(r, e_2), c++) : c && (spliceOne(r, e_2), c--);
    }
    if (!i)
        for (; c--; c)
            r.unshift("..");
    !i || "" === r[0] || r[0] && isAbsolute(r[0]) || r.unshift("");
    var u = r.join("/");
    return o && "/" !== u.substr(-1) && (u += "/"), u;
}
function valueEqual(e, t) { if (e === t)
    return !0; if (null == e || null == t)
    return !1; if (Array.isArray(e))
    return Array.isArray(t) && e.length === t.length && e.every(function (e, n) { return valueEqual(e, t[n]); }); var n = typeof e; if (n !== typeof t)
    return !1; if ("object" === n) {
    var n_1 = e.valueOf(), r = t.valueOf();
    if (n_1 !== e || r !== t)
        return valueEqual(n_1, r);
    var a = Object.keys(e), s = Object.keys(t);
    return a.length === s.length && a.every(function (n) { return valueEqual(e[n], t[n]); });
} return !1; }
function locationsAreEqual(e, t) { return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && valueEqual(e.state, t.state); }
function createLocation(e, t, n, r) { var a; "string" == typeof e ? (a = parsePath(e)).state = t : (void 0 === (a = Object.assign({}, e)).pathname && (a.pathname = ""), a.search ? "?" !== a.search.charAt(0) && (a.search = "?" + a.search) : a.search = "", a.hash ? "#" !== a.hash.charAt(0) && (a.hash = "#" + a.hash) : a.hash = "", void 0 !== t && void 0 === a.state && (a.state = t)); try {
    a.pathname = decodeURI(a.pathname);
}
catch (e) {
    throw e instanceof URIError ? new URIError('Pathname "' + a.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e;
} return n && (a.key = n), r ? a.pathname ? "/" !== a.pathname.charAt(0) && (a.pathname = resolvePathname(a.pathname, r.pathname)) : a.pathname = r.pathname : a.pathname || (a.pathname = "/"), a.query = parseQueryString(a.search), a; }
var patternCache = {}, cacheLimit = 1e4;
var cacheCount = 0;
function compilePath(e, t) { var n = "" + t.end + t.strict, r = patternCache[n] || (patternCache[n] = {}), a = JSON.stringify(e); if (r[a])
    return r[a]; var s = [], i = { re: pathToRegexp(e, s, t), keys: s }; return cacheCount < cacheLimit && (r[a] = i, cacheCount += 1), i; }
function matchPath(e, t) {
    if (t === void 0) { t = {}; }
    "string" == typeof t && (t = { path: t });
    var _a = t.path, n = _a === void 0 ? "/" : _a, _b = t.exact, r = _b === void 0 ? !1 : _b, _c = t.strict, a = _c === void 0 ? !1 : _c, _d = compilePath(n, { end: r, strict: a }), s = _d.re, i = _d.keys, o = s.exec(e);
    if (!o)
        return null;
    var c = o[0], u = o.slice(1), l = e === c;
    return r && !l ? null : { path: n, url: "/" === n && "" === c ? "/" : c, isExact: l, params: i.reduce(function (e, t, n) { return e[t.name] = u[n], e; }, {}) };
}
function matchesAreEqual(e, t) { return null == e && null == t || null != t && e && t && e.path === t.path && e.url === t.url && valueEqual(e.params, t.params); }
var __rest = function (e, t) { var n = {}; for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]); if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var a = 0;
    for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
        t.indexOf(r[a]) < 0 && (n[r[a]] = e[r[a]]);
} return n; };
function defaultConsumerRender(e, t) { return h("context-consumer", { subscribe: e, renderer: t }); }
function createProviderConsumer(e, t) {
    if (t === void 0) { t = defaultConsumerRender; }
    var n = new Map, r = e;
    function a(e, t) { Array.isArray(e) ? e.slice().forEach(function (e) { t[e] = r[e]; }) : t[e] = Object.assign({}, r), t.forceUpdate(); }
    function s(e) { return function (t) { n.has(t) || (n.set(t, e), a(e, t)); }; }
    function i(e, t) { return s(t)(e), function () { n.delete(e); }; }
    return { Provider: function (_a) {
            var e = _a.state, t = _a.children;
            return r = e, n.forEach(a), t;
        }, Consumer: function (_a) {
            var e = _a.children;
            return t(i, e[0]);
        }, wrapConsumer: function (e, t) { var n = e.is; return function (e) { var r = e.children, a = __rest(e, ["children"]); return h(n, Object.assign({ ref: s(t) }, a), r); }; }, injectProps: function (e, t) { var n = null; var r = Object.keys(e.properties).find(function (t) { return 1 == e.properties[t].elementRef; }); if (void 0 == r)
            throw new Error("Please ensure that your Component " + e.is + " has an attribtue with \"@Element\" decorator. " + "This is required to be able to inject properties."); var a = e.prototype.componentWillLoad; e.prototype.componentWillLoad = function () { if (n = i(this[r], t), a)
            return a.bind(this)(); }; var s = e.prototype.componentDidUnload; e.prototype.componentDidUnload = function () { if (n(), s)
            return s.bind(this)(); }; } };
}
var ActiveRouter = createProviderConsumer({ historyType: "browser", location: null, titleSuffix: "", root: "/", history: null, routeViewsUpdated: function () { } });
var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement), addEventListener = function (e, t, n) { return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n); }, removeEventListener = function (e, t, n) { return e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n); }, getConfirmation = function (e, t) { return t(window.confirm(e)); }, isModifiedEvent = function (e) { return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey; }, supportsHistory = function () { var e = window.navigator.userAgent; return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && window.history && "pushState" in window.history; }, supportsPopStateOnHashChange = function () { return -1 === window.navigator.userAgent.indexOf("Trident"); }, supportsGoWithoutReloadUsingHash = function () { return -1 === window.navigator.userAgent.indexOf("Firefox"); }, isExtraneousPopstateEvent = function (e) { return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS"); }, storageAvailable = function (e) { try {
    var t = window[e], n = "__storage_test__";
    return t.setItem(n, n), t.removeItem(n), !0;
}
catch (e) {
    return e instanceof DOMException && (22 === e.code || 1014 === e.code || "QuotaExceededError" === e.name || "NS_ERROR_DOM_QUOTA_REACHED" === e.name) && 0 !== t.length;
} };
export { matchPath as a, matchesAreEqual as b, ActiveRouter as c, storageAvailable as d, createLocation as e, addLeadingSlash as f, stripTrailingSlash as g, hasBasename as h, stripBasename as i, createPath as j, canUseDOM as k, addEventListener as l, removeEventListener as m, getConfirmation as n, supportsHistory as o, supportsPopStateOnHashChange as p, isExtraneousPopstateEvent as q, locationsAreEqual as r, stripLeadingSlash as s, supportsGoWithoutReloadUsingHash as t, isModifiedEvent as u };
