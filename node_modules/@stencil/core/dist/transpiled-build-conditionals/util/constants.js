"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SSR Attribute Names
 */
exports.SSR_VNODE_ID = 'ssrv';
exports.SSR_CHILD_ID = 'ssrc';
/**
 * Default style mode id
 */
exports.DEFAULT_STYLE_MODE = '$';
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
exports.EMPTY_OBJ = {};
exports.EMPTY_ARR = [];
/**
 * Key Name to Key Code Map
 */
exports.KEY_CODE_MAP = {
    'enter': 13,
    'escape': 27,
    'space': 32,
    'tab': 9,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
};
/**
 * Namespaces
 */
exports.SVG_NS = 'http://www.w3.org/2000/svg';
exports.XLINK_NS = 'http://www.w3.org/1999/xlink';
exports.XML_NS = 'http://www.w3.org/XML/1998/namespace';
/**
 * File names and value
 */
exports.BANNER = "Built with http://stenciljs.com";
exports.COLLECTION_MANIFEST_FILE_NAME = 'collection-manifest.json';
exports.APP_NAMESPACE_REGEX = /["']__APP__['"]/g;
