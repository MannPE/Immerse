/*! Built with http://stenciljs.com */
import{h}from"./app.core.js";var AppIcon=function(){function e(){}return e.prototype.render=function(){return h("svg",{class:"icon icon-"+this.name},h("use",{xlinkHref:"#icon-"+this.name}))},Object.defineProperty(e,"is",{get:function(){return"app-icon"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{name:{type:String,attr:"name"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"app-icon .icon-checkmark{fill:#5851ff;width:15px;height:11px}app-icon .icon-targetblank{fill:#abb2bf;width:9px;height:9px}app-icon .icon-slack,app-icon .icon-trash,app-icon .icon-twitter{fill:#16161d;width:16px;height:16px}app-icon .icon-menu{fill:#5851ff;width:17px;height:15px}app-icon .icon-close{fill:#5851ff;width:14px;height:14px}app-icon .icon-more{fill:#5851ff;width:4px;height:18px}"},enumerable:!0,configurable:!0}),e}();export{AppIcon};