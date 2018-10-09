/*! Built with http://stenciljs.com */
App.loadBundle('app-icon', ['exports'], function (exports) {
    var h = window.App.h;
    var AppIcon = /** @class */ (function () {
        function AppIcon() {
        }
        AppIcon.prototype.render = function () {
            return (h("svg", { class: "icon icon-" + this.name }, h("use", { xlinkHref: "#icon-" + this.name })));
        };
        Object.defineProperty(AppIcon, "is", {
            get: function () { return "app-icon"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppIcon, "properties", {
            get: function () {
                return {
                    "name": {
                        "type": String,
                        "attr": "name"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppIcon, "style", {
            get: function () { return "app-icon .icon-checkmark {\n  fill: #5851ff;\n  width: 15px;\n  height: 11px; }\n\napp-icon .icon-targetblank {\n  fill: #abb2bf;\n  width: 9px;\n  height: 9px; }\n\napp-icon .icon-slack,\napp-icon .icon-twitter, app-icon .icon-trash {\n  fill: #16161D;\n  width: 16px;\n  height: 16px; }\n\napp-icon .icon-menu {\n  fill: #5851ff;\n  width: 17px;\n  height: 15px; }\n\napp-icon .icon-close {\n  fill: #5851ff;\n  width: 14px;\n  height: 14px; }\n\napp-icon .icon-more {\n  fill: #5851ff;\n  width: 4px;\n  height: 18px; }"; },
            enumerable: true,
            configurable: true
        });
        return AppIcon;
    }());
    exports.AppIcon = AppIcon;
    Object.defineProperty(exports, '__esModule', { value: true });
});
