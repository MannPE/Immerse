"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../util/constants");
function hasServiceWorkerChanges(config, buildCtx) {
    if (config.devMode && !config.flags.serviceWorker) {
        return false;
    }
    var wwwServiceOutputs = config.outputTargets.filter(function (o) { return o.type === 'www' && o.serviceWorker; });
    return wwwServiceOutputs.some(function (outputTarget) {
        return buildCtx.filesChanged.some(function (fileChanged) { return config.sys.path.basename(fileChanged).toLowerCase() === config.sys.path.basename(outputTarget.serviceWorker.swSrc).toLowerCase(); });
    });
}
exports.hasServiceWorkerChanges = hasServiceWorkerChanges;
/**
 * Test if a file is a typescript source file, such as .ts or .tsx.
 * However, d.ts files and spec.ts files return false.
 * @param filePath
 */
function isTsFile(filePath) {
    var parts = filePath.toLowerCase().split('.');
    if (parts.length > 1) {
        if (parts[parts.length - 1] === 'ts' || parts[parts.length - 1] === 'tsx') {
            if (parts.length > 2 && (parts[parts.length - 2] === 'd' || parts[parts.length - 2] === 'spec')) {
                return false;
            }
            return true;
        }
    }
    return false;
}
exports.isTsFile = isTsFile;
function isDtsFile(filePath) {
    var parts = filePath.toLowerCase().split('.');
    if (parts.length > 2) {
        return (parts[parts.length - 2] === 'd' && parts[parts.length - 1] === 'ts');
    }
    return false;
}
exports.isDtsFile = isDtsFile;
function isJsFile(filePath) {
    var parts = filePath.toLowerCase().split('.');
    if (parts.length > 1) {
        if (parts[parts.length - 1] === 'js') {
            if (parts.length > 2 && parts[parts.length - 2] === 'spec') {
                return false;
            }
            return true;
        }
    }
    return false;
}
exports.isJsFile = isJsFile;
function hasFileExtension(filePath, extensions) {
    filePath = filePath.toLowerCase();
    return extensions.some(function (ext) { return filePath.endsWith('.' + ext); });
}
exports.hasFileExtension = hasFileExtension;
function isCssFile(filePath) {
    return hasFileExtension(filePath, ['css']);
}
exports.isCssFile = isCssFile;
function isHtmlFile(filePath) {
    return hasFileExtension(filePath, ['html', 'htm']);
}
exports.isHtmlFile = isHtmlFile;
/**
 * Only web development text files, like ts, tsx,
 * js, html, css, scss, etc.
 * @param filePath
 */
function isWebDevFile(filePath) {
    return (hasFileExtension(filePath, WEB_DEV_EXT) || isTsFile(filePath));
}
exports.isWebDevFile = isWebDevFile;
var WEB_DEV_EXT = ['js', 'jsx', 'html', 'htm', 'css', 'scss', 'sass', 'less', 'styl', 'pcss'];
function generatePreamble(config, opts) {
    if (opts === void 0) { opts = {}; }
    var preamble = [];
    if (config.preamble) {
        preamble = config.preamble.split('\n');
    }
    if (typeof opts.prefix === 'string') {
        opts.prefix.split('\n').forEach(function (c) {
            preamble.push(c);
        });
    }
    preamble.push(constants_1.BANNER);
    if (typeof opts.suffix === 'string') {
        opts.suffix.split('\n').forEach(function (c) {
            preamble.push(c);
        });
    }
    if (preamble.length > 1) {
        preamble = preamble.map(function (l) { return " * " + l; });
        preamble.unshift("/*!");
        preamble.push(" */");
        return preamble.join('\n');
    }
    return "/*! " + constants_1.BANNER + " */";
}
exports.generatePreamble = generatePreamble;
function buildError(diagnostics) {
    var diagnostic = {
        level: 'error',
        type: 'build',
        header: 'Build Error',
        messageText: 'build error',
        relFilePath: null,
        absFilePath: null,
        lines: []
    };
    diagnostics.push(diagnostic);
    return diagnostic;
}
exports.buildError = buildError;
function buildWarn(diagnostics) {
    var diagnostic = {
        level: 'warn',
        type: 'build',
        header: 'build warn',
        messageText: 'build warn',
        relFilePath: null,
        absFilePath: null,
        lines: []
    };
    diagnostics.push(diagnostic);
    return diagnostic;
}
exports.buildWarn = buildWarn;
function catchError(diagnostics, err, msg) {
    var diagnostic = {
        level: 'error',
        type: 'build',
        header: 'Build Error',
        messageText: 'build error',
        relFilePath: null,
        absFilePath: null,
        lines: []
    };
    if (typeof msg === 'string') {
        diagnostic.messageText = msg;
    }
    else if (err) {
        if (err.stack) {
            diagnostic.messageText = err.stack.toString();
        }
        else {
            if (err.message) {
                diagnostic.messageText = err.message.toString();
            }
            else {
                diagnostic.messageText = err.toString();
            }
        }
    }
    if (diagnostics && !shouldIgnoreError(diagnostic.messageText)) {
        diagnostics.push(diagnostic);
    }
}
exports.catchError = catchError;
exports.TASK_CANCELED_MSG = "task canceled";
function shouldIgnoreError(msg) {
    return (msg === exports.TASK_CANCELED_MSG);
}
exports.shouldIgnoreError = shouldIgnoreError;
function hasError(diagnostics) {
    if (!diagnostics) {
        return false;
    }
    return diagnostics.some(function (d) { return d.level === 'error' && d.type !== 'runtime'; });
}
exports.hasError = hasError;
function pathJoin(config) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return normalizePath(config.sys.path.join.apply(config.sys.path, paths));
}
exports.pathJoin = pathJoin;
function normalizePath(str) {
    // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
    // https://github.com/sindresorhus/slash MIT
    // By Sindre Sorhus
    if (typeof str !== 'string') {
        throw new Error("invalid path to normalize");
    }
    str = str.trim();
    if (EXTENDED_PATH_REGEX.test(str) || NON_ASCII_REGEX.test(str)) {
        return str;
    }
    str = str.replace(SLASH_REGEX, '/');
    // always remove the trailing /
    // this makes our file cache look ups consistent
    if (str.charAt(str.length - 1) === '/') {
        var colonIndex = str.indexOf(':');
        if (colonIndex > -1) {
            if (colonIndex < str.length - 2) {
                str = str.substring(0, str.length - 1);
            }
        }
        else if (str.length > 1) {
            str = str.substring(0, str.length - 1);
        }
    }
    return str;
}
exports.normalizePath = normalizePath;
var EXTENDED_PATH_REGEX = /^\\\\\?\\/;
var NON_ASCII_REGEX = /[^\x00-\x80]+/;
var SLASH_REGEX = /\\/g;
