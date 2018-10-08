/*! Built with http://stenciljs.com */
const{h:t}=window.App;import{a as e,b as o,c as s,d as n,e as i,f as r,g as a,h as c,i as l,j as h,k as u,l as p,m as d,n as f,o as m,p as y,q as w,r as g,s as b,t as v}from"./chunk-0844f48d.js";class S{handleResize(){requestAnimationFrame(()=>{window.innerWidth>768&&(this.el.querySelector(".header-menu").style.display="",this.el.classList.remove("show-mobile-menu"),document.body.classList.remove("no-scroll"),this.isMobileMenuShown=!1)})}componentDidLoad(){this.isMobileMenuShown=!1}showNav(t){console.log("should show now open",this.isMobileMenuShown,t),this.isMobileMenuShown||(this.isMobileMenuShown=!0,this.el.querySelector(".header-menu").style.display="flex",setTimeout(()=>{this.el.classList.add("show-mobile-menu"),document.body.classList.add("no-scroll")},1))}hideNav(){if(console.log("should show now close",this.isMobileMenuShown),!this.isMobileMenuShown)return;this.isMobileMenuShown=!1;const t=this.el.querySelector(".header-menu");this.el.classList.remove("show-mobile-menu"),setTimeout(()=>{t.style.display="none",document.body.classList.remove("no-scroll")},300)}render(){return t("div",{class:"container"},t("div",{class:"header-menu"},t("stencil-route-link",{url:"/words",exact:!0,onClick:()=>{this.hideNav()}},"My Words"),t("stencil-route-link",{url:"/settings",exact:!0,onClick:()=>{this.hideNav()}},"Settings"),t("stencil-route-link",{url:"/",exact:!0,onClick:()=>{this.hideNav()}},"Immerse"),t("a",{class:"link--external",target:"_blank",href:"https://paypal.com"},"Donate ",t("app-icon",{name:"targetblank"})),t("div",{class:"header-close",onClick:()=>{this.hideNav()}},t("app-icon",{name:"close"}))))}static get is(){return"imr-app-header"}static get properties(){return{el:{elementRef:!0},isMobileMenuShown:{state:!0}}}static get listeners(){return[{name:"window:resize",method:"handleResize",passive:!0}]}static get style(){return"translate-header{position:fixed;top:0;left:0;width:100%;background-color:#fff;z-index:99}translate-header .logo{width:96px}translate-header .container{padding-top:20px;padding-bottom:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}\@media screen and (max-width:768px){translate-header .container{padding-top:15px;padding-bottom:15px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.header-close,.header-overflow{display:block;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}}.header-menu a{-webkit-transition:border .3s,color .3s;transition:border .3s,color .3s;font-size:14px;padding-bottom:1em;border-bottom:3px solid transparent;vertical-align:top;color:#8888a2;text-decoration:none;font-weight:500;letter-spacing:-.02em}.header-menu stencil-route-link+a,.header-menu stencil-route-link+stencil-route-link{margin-left:30px}.header-menu a.link-active,.header-menu a:not(.link--external):hover{border-bottom-color:rgba(136,136,162,.2)}.header-menu a.link-active{color:#505061}.header-menu .link--external .icon{-webkit-transition:top .2s,left .2s;transition:top .2s,left .2s;position:relative}.header-menu .link--external:hover{color:#505061}.header-menu .link--external:hover .icon{left:1px;top:-1px}.header-close,.header-overflow{-webkit-transition:opacity .3s;transition:opacity .3s;width:22px;height:18px;cursor:pointer;opacity:.5}.header-close:hover,.header-overflow:hover{opacity:1}.header-close .icon-close{fill:#fff}"}}class T{constructor(){this.elements=["site-header","site-menu","app-burger",".root"]}handleResize(){requestAnimationFrame(()=>{window.innerWidth>768&&this.isLeftSidebarIn&&(this.isLeftSidebarIn=!1,document.body.classList.remove("no-scroll"),this.elements.forEach(t=>{this.el.querySelector(t).classList.remove("left-sidebar-in")}))})}componentDidLoad(){this.isLeftSidebarIn=!1}render(){return[t("imr-app-header",null),t("div",{class:"root"},t("div",{class:"container"},t("stencil-router",{scrollTopOffset:0},t("stencil-route-switch",null,t("stencil-route",{url:"/words",component:"imr-view-word-list"}),t("stencil-route",{url:"/settings",component:"pwas-page"}),t("stencil-route",{component:"imr-view-main"})))),",",t("footer",null,t("div",{class:"container"},t("div",{class:"footer__open-source"},t("p",null,"Made by Manuel Puentes @2018")),t("div",{class:"footer__icons"},t("a",{class:"svg-button",id:"stencil-twitter",href:"https://twitter.com/stenciljs",target:"_blank",rel:"noopener",title:"Follow me on "},t("app-icon",{name:"twitter"})),t("a",{class:"svg-button",id:"ionic-forum",href:"https://stencil-worldwide.herokuapp.com",target:"_blank",rel:"noopener",title:"Join the stencil worldwide slack"},t("app-icon",{name:"slack"}))))))]}static get is(){return"imr-app-root"}static get properties(){return{el:{elementRef:!0},isLeftSidebarIn:{state:!0}}}static get listeners(){return[{name:"window:resize",method:"handleResize",passive:!0}]}static get style(){return"*{-webkit-box-sizing:border-box;box-sizing:border-box}::-moz-selection{background:#ebebf7}::-moz-selection,::selection{background:#ebebf7}stencil-route-link:hover{cursor:pointer}app-root{min-height:100%;display:block}.no-scroll{overflow:hidden}.left-sidebar-in{-webkit-animation-name:slideIn;animation-name:slideIn;-webkit-animation-duration:.7s;animation-duration:.7s;-webkit-animation-timing-function:cubic-bezier(.19,1,.22,1);animation-timing-function:cubic-bezier(.19,1,.22,1);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}\@-webkit-keyframes slideIn{from{left:0}to{left:calc(100vw - 56px)}}\@keyframes slideIn{from{left:0}to{left:calc(100vw - 56px)}}.left-sidebar-out{-webkit-animation-name:slideOut;animation-name:slideOut;-webkit-animation-duration:.7s;animation-duration:.7s;-webkit-animation-timing-function:cubic-bezier(.19,1,.22,1);animation-timing-function:cubic-bezier(.19,1,.22,1);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}\@-webkit-keyframes slideOut{from{left:calc(100vw - 56px)}to{left:0}}\@keyframes slideOut{from{left:calc(100vw - 56px)}to{left:0}}.container{width:100%;max-width:1080px;margin-left:auto;margin-right:auto;padding:0 1em;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto}.root{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:6em 0 0}footer{width:100%;background:#f8f8fc;-webkit-box-flex:0;-ms-flex:0 0 6em;flex:0 0 6em;margin-top:100px;padding:40px 0;display:-webkit-box;display:-ms-flexbox;display:flex}footer .container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}footer .svg-button{margin-left:16px;-webkit-transition:all .15s ease;transition:all .15s ease}footer .svg-button:hover{opacity:.5}.footer__icons{display:-webkit-box;display:-ms-flexbox;display:flex}.footer__open-source img{width:50%}.footer__open-source p{margin-top:0;margin-bottom:0;color:#abb2bf;font-size:10px}"}}class O{constructor(){this.group=null,this.groupMatch=null,this.componentUpdated=null,this.match=null,this.unsubscribe=(()=>{}),this.componentProps={},this.exact=!1,this.routeRender=null,this.scrollTopOffset=null,this.scrollOnNextRender=!1,this.previousMatch=null}computeMatch(){return this.previousMatch=this.match,this.group?this.groupMatch?this.match=e(this.location.pathname,{path:this.url,exact:this.exact,strict:!0}):void 0:this.match=e(this.location.pathname,{path:this.url,exact:this.exact,strict:!0})}componentDidUpdate(){Promise.all(Array.from(this.el.children).map(t=>t.componentOnReady?t.componentOnReady():Promise.resolve(t))).then(()=>{"function"==typeof this.componentUpdated?this.componentUpdated({scrollTopOffset:this.scrollTopOffset}):this.match&&!o(this.match,this.previousMatch)&&this.routeViewsUpdated({scrollTopOffset:this.scrollTopOffset})})}render(){if(!this.match)return null;const e=Object.assign({},this.componentProps,{history:this.history,match:this.match});if(this.routeRender)return this.routeRender(Object.assign({},e,{component:this.component}));if(this.component){const o=this.component;return t(o,Object.assign({},e))}}static get is(){return"stencil-route"}static get properties(){return{component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},componentUpdated:{type:"Any",attr:"component-updated"},el:{elementRef:!0},exact:{type:Boolean,attr:"exact"},group:{type:String,attr:"group"},groupMatch:{type:"Any",attr:"group-match"},history:{type:"Any",attr:"history"},historyType:{type:String,attr:"history-type"},location:{type:"Any",attr:"location",watchCallbacks:["computeMatch"]},match:{state:!0},routeRender:{type:"Any",attr:"route-render"},routeViewsUpdated:{type:"Any",attr:"route-views-updated"},scrollTopOffset:{type:Number,attr:"scroll-top-offset"},url:{type:String,attr:"url"}}}static get style(){return"stencil-route.inactive{display:none}"}}s.injectProps(O,["location","history","historyType","routeViewsUpdated"]);var x=function(t,e,o,s){return new(o||(o=Promise))(function(n,i){function r(t){try{c(s.next(t))}catch(t){i(t)}}function a(t){try{c(s.throw(t))}catch(t){i(t)}}function c(t){t.done?n(t.value):new o(function(e){e(t.value)}).then(r,a)}c((s=s.apply(t,e||[])).next())})};class P{constructor(){this.group=window.crypto?([1e7].toString()+-1e3.toString()+-4e3.toString()+-8e3.toString()+-1e11.toString()).replace(/[018]/g,function(t){return(t^window.crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)}):(1e17*Math.random()).toString().match(/.{4}/g).join("-"),this.scrollTopOffset=null,this.activeIndex=null}componentWillLoad(){this.regenerateSubscribers(this.location)}regenerateSubscribers(t){return x(this,void 0,void 0,function*(){let o=null;var s,n,i;this.subscribers=Array.from(this.el.children).map((r,a)=>{const c=(s=t.pathname,n=r.url,i=r.exact,e(s,{path:n,exact:i,strict:!0}));return c&&null===o&&(o=a),{el:r,match:c}}),this.activeIndex!==o?(this.activeIndex=o,new Promise(t=>{const e=this.subscribers[this.activeIndex];e.el.scrollTopOffset=this.scrollTopOffset,e.el.group=this.group,e.el.groupMatch=e.match,e.el.componentUpdated=t}).then(t=>{this.queue.write(()=>{this.subscribers.forEach((t,e)=>{if(t.el.componentUpdated=null,e===this.activeIndex)return t.el.style.display=null;t.el.scrollTopOffset=this.scrollTopOffset,t.el.group=this.group,t.el.groupMatch=null,t.el.style.display="none"})}),this.routeViewsUpdated(Object.assign({scrollTopOffset:this.scrollTopOffset},t))})):this.subscribers[this.activeIndex].el.groupMatch=this.subscribers[this.activeIndex].match})}render(){return t("slot",null)}static get is(){return"stencil-route-switch"}static get properties(){return{el:{elementRef:!0},group:{type:String,attr:"group",reflectToAttr:!0},location:{type:"Any",attr:"location",watchCallbacks:["regenerateSubscribers"]},queue:{context:"queue"},routeViewsUpdated:{type:"Any",attr:"route-views-updated"},scrollTopOffset:{type:Number,attr:"scroll-top-offset"}}}}function k(t,...e){t||console.error(...e)}function M(t,...e){t||console.warn(...e)}s.injectProps(P,["location","routeViewsUpdated"]);const L=()=>{let t,e=[];return{setPrompt:e=>(M(null==t,"A history supports only one prompt at a time"),t=e,()=>{t===e&&(t=null)}),confirmTransitionTo:(e,o,s,n)=>{if(null!=t){const i="function"==typeof t?t(e,o):t;"string"==typeof i?"function"==typeof s?s(i,n):(M(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),n(!0)):n(!1!==i)}else n(!0)},appendListener:t=>{let o=!0;const s=(...e)=>{o&&t(...e)};return e.push(s),()=>{o=!1,e=e.filter(t=>t!==s)}},notifyListeners:(...t)=>{e.forEach(e=>e(...t))}}},R=(t="scrollPositions")=>{let e=new Map;function o(t,o){if(e.set(t,o),n("sessionStorage")){const t=[];e.forEach((e,o)=>{t.push([o,e])}),window.sessionStorage.setItem("scrollPositions",JSON.stringify(t))}}return n("sessionStorage")&&(e=window.sessionStorage.getItem(t)?new Map(JSON.parse(window.sessionStorage.getItem(t))):e),"scrollRestoration"in history&&(history.scrollRestoration="manual"),{set:o,get:function(t){return e.get(t)},has:function(t){return e.has(t)},capture:function(t){o(t,[window.scrollX,window.scrollY])}}},U=()=>{try{return window.history.state||{}}catch(t){return{}}},A={hashbang:{encodePath:t=>"!"===t.charAt(0)?t:"!/"+b(t),decodePath:t=>"!"===t.charAt(0)?t.substr(1):t},noslash:{encodePath:b,decodePath:r},slash:{encodePath:r,decodePath:r}},I=()=>{const t=window.location.href,e=t.indexOf("#");return-1===e?"":t.substring(e+1)},j=t=>{const e=window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0,e>=0?e:0)+"#"+t)};var H=function(t,e,o,s){return new(o||(o=Promise))(function(n,i){function r(t){try{c(s.next(t))}catch(t){i(t)}}function a(t){try{c(s.throw(t))}catch(t){i(t)}}function c(t){t.done?n(t.value):new o(function(e){e(t.value)}).then(r,a)}c((s=s.apply(t,e||[])).next())})};const q={browser:(t={})=>{k(u,"Browser history needs a DOM");const e=window.history,o=m(),s=!y(),n=R(),{forceRefresh:g=!1,getUserConfirmation:b=f,keyLength:v=6}=t,S=t.basename?a(r(t.basename)):"",T=t=>{t=t||{};const{key:e,state:o}=t,{pathname:s,search:n,hash:r}=window.location;let a=s+n+r;return M(!S||c(a,S),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+a+'" to begin with "'+S+'".'),S&&(a=l(a,S)),i(a,o,e)},O=()=>Math.random().toString(36).substr(2,v),x=L(),P=t=>{n.capture(D.location.key),Object.assign(D,t),D.location.scrollPosition=n.get(D.location.key),D.length=e.length,x.notifyListeners(D.location,D.action)},A=t=>{w(t)||H(T(t.state))},I=()=>{H(T(U()))};let j=!1;const H=t=>{if(j)j=!1,P();else{const e="POP";x.confirmTransitionTo(t,e,b,o=>{o?P({action:e,location:t}):q(t)})}},q=t=>{const e=D.location;let o=C.indexOf(e.key);-1===o&&(o=0);let s=C.indexOf(t.key);-1===s&&(s=0);const n=o-s;n&&(j=!0,V(n))},E=T(U());let C=[E.key];const N=t=>S+h(t),V=t=>{e.go(t)};let _=0;const z=t=>{1===(_+=t)?(p(window,"popstate",A),s&&p(window,"hashchange",I)):0===_&&(d(window,"popstate",A),s&&d(window,"hashchange",I))};let B=!1;const D={length:e.length,action:"POP",location:E,createHref:N,push:(t,s)=>{M(!("object"==typeof t&&void 0!==t.state&&void 0!==s),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");const n=i(t,s,O(),D.location);x.confirmTransitionTo(n,"PUSH",b,t=>{if(!t)return;const s=N(n),{key:i,state:r}=n;if(o)if(e.pushState({key:i,state:r},null,s),g)window.location.href=s;else{const t=C.indexOf(D.location.key),e=C.slice(0,-1===t?0:t+1);e.push(n.key),C=e,P({action:"PUSH",location:n})}else M(void 0===r,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=s})},replace:(t,s)=>{M(!("object"==typeof t&&void 0!==t.state&&void 0!==s),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");const n=i(t,s,O(),D.location);x.confirmTransitionTo(n,"REPLACE",b,t=>{if(!t)return;const s=N(n),{key:i,state:r}=n;if(o)if(e.replaceState({key:i,state:r},null,s),g)window.location.replace(s);else{const t=C.indexOf(D.location.key);-1!==t&&(C[t]=n.key),P({action:"REPLACE",location:n})}else M(void 0===r,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(s)})},go:V,goBack:()=>V(-1),goForward:()=>V(1),block:(t="")=>{const e=x.setPrompt(t);return B||(z(1),B=!0),()=>(B&&(B=!1,z(-1)),e())},listen:t=>{const e=x.appendListener(t);return z(1),()=>{z(-1),e()}}};return D},hash:(t={})=>{k(u,"Hash history needs a DOM");const e=window.history,o=v(),{getUserConfirmation:s=f,hashType:n="slash"}=t,m=t.basename?a(r(t.basename)):"",{encodePath:y,decodePath:w}=A[n],b=()=>{let t=w(I());return M(!m||c(t,m),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+t+'" to begin with "'+m+'".'),m&&(t=l(t,m)),i(t)},S=L(),T=t=>{Object.assign(B,t),B.length=e.length,S.notifyListeners(B.location,B.action)};let O=!1,x=null;const P=()=>{const t=I(),e=y(t);if(t!==e)j(e);else{const t=b(),e=B.location;if(!O&&g(e,t))return;if(x===h(t))return;x=null,R(t)}},R=t=>{if(O)O=!1,T();else{const e="POP";S.confirmTransitionTo(t,e,s,o=>{o?T({action:e,location:t}):U(t)})}},U=t=>{const e=B.location;let o=C.lastIndexOf(h(e));-1===o&&(o=0);let s=C.lastIndexOf(h(t));-1===s&&(s=0);const n=o-s;n&&(O=!0,N(n))},H=I(),q=y(H);H!==q&&j(q);const E=b();let C=[h(E)];const N=t=>{M(o,"Hash history go(n) causes a full page reload in this browser"),e.go(t)};let V=0;const _=t=>{1===(V+=t)?p(window,"hashchange",P):0===V&&d(window,"hashchange",P)};let z=!1;const B={length:e.length,action:"POP",location:E,createHref:t=>"#"+y(m+h(t)),push:(t,e)=>{M(void 0===e,"Hash history cannot push state; it is ignored");const o=i(t,void 0,void 0,B.location);S.confirmTransitionTo(o,"PUSH",s,t=>{if(!t)return;const e=h(o),s=y(m+e);if(I()!==s){x=e,(t=>window.location.hash=t)(s);const t=C.lastIndexOf(h(B.location)),n=C.slice(0,-1===t?0:t+1);n.push(e),C=n,T({action:"PUSH",location:o})}else M(!1,"Hash history cannot PUSH the same path; a new entry will not be added to the history stack"),T()})},replace:(t,e)=>{M(void 0===e,"Hash history cannot replace state; it is ignored");const o=i(t,void 0,void 0,B.location);S.confirmTransitionTo(o,"REPLACE",s,t=>{if(!t)return;const e=h(o),s=y(m+e);I()!==s&&(x=e,j(s));const n=C.indexOf(h(B.location));-1!==n&&(C[n]=e),T({action:"REPLACE",location:o})})},go:N,goBack:()=>N(-1),goForward:()=>N(1),block:(t="")=>{const e=S.setPrompt(t);return z||(_(1),z=!0),()=>(z&&(z=!1,_(-1)),e())},listen:t=>{const e=S.appendListener(t);return _(1),()=>{_(-1),e()}}};return B}};class E{constructor(){this.root="/",this.historyType="browser",this.titleSuffix="",this.scrollTopOffset=null,this.routeViewsUpdated=((t={})=>{this.scrollTo(t.scrollTopOffset||this.scrollTopOffset)})}componentWillLoad(){this.history=q[this.historyType](),this.history.listen(t=>H(this,void 0,void 0,function*(){t=this.getLocation(t),this.location=t})),this.location=this.getLocation(this.history.location)}scrollTo(t){if(null!=t&&!this.isServer&&this.history)return"POP"===this.history.action&&null!=this.history.location.scrollPosition?this.queue.write(()=>{window.scrollTo(this.history.location.scrollPosition[0],this.history.location.scrollPosition[1])}):this.queue.write(()=>{window.scrollTo(0,t)})}getLocation(t){const e=0==t.pathname.indexOf(this.root)?"/"+t.pathname.slice(this.root.length):t.pathname;return Object.assign({},t,{pathname:e})}render(){const e={historyType:this.historyType,location:this.location,titleSuffix:this.titleSuffix,root:this.root,history:this.history,routeViewsUpdated:this.routeViewsUpdated};return t(s.Provider,{state:e},t("slot",null))}static get is(){return"stencil-router"}static get properties(){return{history:{state:!0},historyType:{type:String,attr:"history-type"},isServer:{context:"isServer"},location:{state:!0},queue:{context:"queue"},root:{type:String,attr:"root"},scrollTopOffset:{type:Number,attr:"scroll-top-offset"},titleSuffix:{type:String,attr:"title-suffix"}}}}export{S as ImrAppHeader,T as ImrAppRoot,O as StencilRoute,P as StencilRouteSwitch,E as StencilRouter};