'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var ts = require('typescript');
var crypto = require('crypto');
var os = require('os');
var cp = require('child_process');
var events = require('events');
var url = require('url');

class NodeLogger {
    constructor() {
        this._level = 'info';
        this.writeLogQueue = [];
        this.buildLogFilePath = null;
        const rootDir = path.join(__dirname, '..', '..', '..');
        const distDir = path.join(rootDir, 'dist');
        const sysUtil = require(path.join(distDir, 'sys', 'node', 'sys-util.js'));
        this.tc = sysUtil.turbocolor;
    }
    get level() {
        return this._level;
    }
    set level(l) {
        if (typeof l === 'string') {
            l = l.toLowerCase().trim();
            if (LOG_LEVELS.indexOf(l) === -1) {
                this.error(`Invalid log level '${this.tc.bold(l)}' (choose from: ${LOG_LEVELS.map(l => this.tc.bold(l)).join(', ')})`);
            }
            else {
                this._level = l;
            }
        }
    }
    info(...msg) {
        if (this.shouldLog('info')) {
            const lines = wordWrap(msg, getColumns());
            this.infoPrefix(lines);
            console.log(lines.join('\n'));
        }
        this.queueWriteLog('I', msg);
    }
    infoPrefix(lines) {
        if (lines.length) {
            const d = new Date();
            const prefix = '[' +
                ('0' + d.getMinutes()).slice(-2) + ':' +
                ('0' + d.getSeconds()).slice(-2) + '.' +
                Math.floor((d.getMilliseconds() / 1000) * 10) + ']';
            lines[0] = this.dim(prefix) + lines[0].substr(prefix.length);
        }
    }
    warn(...msg) {
        if (this.shouldLog('warn')) {
            const lines = wordWrap(msg, getColumns());
            this.warnPrefix(lines);
            console.warn('\n' + lines.join('\n') + '\n');
        }
        this.queueWriteLog('W', msg);
    }
    warnPrefix(lines) {
        if (lines.length) {
            const prefix = '[ WARN  ]';
            lines[0] = this.bold(this.tc.yellow(prefix)) + lines[0].substr(prefix.length);
        }
    }
    error(...msg) {
        for (let i = 0; i < msg.length; i++) {
            if (msg[i] instanceof Error) {
                const err = msg[i];
                msg[i] = err.message;
                if (err.stack) {
                    msg[i] += '\n' + err.stack;
                }
            }
        }
        if (this.shouldLog('error')) {
            const lines = wordWrap(msg, getColumns());
            this.errorPrefix(lines);
            console.error('\n' + lines.join('\n') + '\n');
        }
        this.queueWriteLog('E', msg);
    }
    errorPrefix(lines) {
        if (lines.length) {
            const prefix = '[ ERROR ]';
            lines[0] = this.bold(this.tc.red(prefix)) + lines[0].substr(prefix.length);
        }
    }
    debug(...msg) {
        if (this.shouldLog('debug')) {
            msg.push(this.dim(` MEM: ${(process.memoryUsage().rss / 1000000).toFixed(1)}MB`));
            const lines = wordWrap(msg, getColumns());
            this.debugPrefix(lines);
            console.log(lines.join('\n'));
        }
        this.queueWriteLog('D', msg);
    }
    debugPrefix(lines) {
        if (lines.length) {
            const d = new Date();
            const prefix = '[' +
                ('0' + d.getMinutes()).slice(-2) + ':' +
                ('0' + d.getSeconds()).slice(-2) + '.' +
                Math.floor((d.getMilliseconds() / 1000) * 10) + ']';
            lines[0] = this.tc.cyan(prefix) + lines[0].substr(prefix.length);
        }
    }
    timespanStart(startMsg, debug, appendTo) {
        const msg = [`${startMsg} ${this.dim('...')}`];
        if (debug) {
            if (this.shouldLog('debug')) {
                const lines = wordWrap(msg, getColumns());
                this.debugPrefix(lines);
                console.log(lines.join('\n'));
                this.queueWriteLog('D', [`${startMsg} ...`]);
            }
        }
        else {
            const lines = wordWrap(msg, getColumns());
            this.infoPrefix(lines);
            console.log(lines.join('\n'));
            this.queueWriteLog('I', [`${startMsg} ...`]);
            if (appendTo) {
                appendTo.push(`${startMsg} ...`);
            }
        }
    }
    timespanFinish(finishMsg, timeSuffix, color, bold, newLineSuffix, debug, appendTo) {
        let msg = finishMsg;
        if (color) {
            msg = this.color(finishMsg, color);
        }
        if (bold) {
            msg = this.bold(msg);
        }
        msg += ' ' + this.dim(timeSuffix);
        if (debug) {
            if (this.shouldLog('debug')) {
                const lines = wordWrap([msg], getColumns());
                this.debugPrefix(lines);
                console.log(lines.join('\n'));
            }
            this.queueWriteLog('D', [`${finishMsg} ${timeSuffix}`]);
        }
        else {
            const lines = wordWrap([msg], getColumns());
            this.infoPrefix(lines);
            console.log(lines.join('\n'));
            this.queueWriteLog('I', [`${finishMsg} ${timeSuffix}`]);
            if (appendTo) {
                appendTo.push(`${finishMsg} ${timeSuffix}`);
            }
        }
        if (newLineSuffix) {
            console.log('');
        }
    }
    queueWriteLog(prefix, msg) {
        if (this.buildLogFilePath) {
            const d = new Date();
            const log = '' +
                ('0' + d.getHours()).slice(-2) + ':' +
                ('0' + d.getMinutes()).slice(-2) + ':' +
                ('0' + d.getSeconds()).slice(-2) + '.' +
                ('0' + Math.floor((d.getMilliseconds() / 1000) * 10)) +
                '  ' +
                ('000' + (process.memoryUsage().rss / 1000000).toFixed(1)).slice(-6) + 'MB' +
                '  ' + prefix +
                '  ' +
                msg.join(', ');
            this.writeLogQueue.push(log);
        }
    }
    writeLogs(append) {
        if (this.buildLogFilePath) {
            try {
                this.queueWriteLog('F', ['--------------------------------------']);
                const log = this.writeLogQueue.join('\n');
                if (append) {
                    try {
                        fs.accessSync(this.buildLogFilePath);
                    }
                    catch (e) {
                        append = false;
                    }
                }
                if (append) {
                    fs.appendFileSync(this.buildLogFilePath, log);
                }
                else {
                    fs.writeFileSync(this.buildLogFilePath, log);
                }
            }
            catch (e) { }
        }
        this.writeLogQueue.length = 0;
    }
    color(msg, color) {
        return this.tc[color](msg);
    }
    red(msg) {
        return this.tc.red(msg);
    }
    green(msg) {
        return this.tc.green(msg);
    }
    yellow(msg) {
        return this.tc.yellow(msg);
    }
    blue(msg) {
        return this.tc.blue(msg);
    }
    magenta(msg) {
        return this.tc.magenta(msg);
    }
    cyan(msg) {
        return this.tc.cyan(msg);
    }
    gray(msg) {
        return this.tc.gray(msg);
    }
    bold(msg) {
        return this.tc.bold(msg);
    }
    dim(msg) {
        return this.tc.dim(msg);
    }
    shouldLog(level) {
        return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(this.level);
    }
    createTimeSpan(startMsg, debug = false, appendTo) {
        return new CmdTimeSpan(this, startMsg, debug, appendTo);
    }
    printDiagnostics(diagnostics) {
        if (!diagnostics || !diagnostics.length)
            return;
        let outputLines = [''];
        diagnostics.forEach(d => {
            outputLines = outputLines.concat(this.printDiagnostic(d));
        });
        console.log(outputLines.join('\n'));
    }
    printDiagnostic(d) {
        const outputLines = wordWrap([d.messageText], getColumns());
        let header = '';
        if (d.header && d.header !== 'Build Error') {
            header += d.header;
        }
        if (d.relFilePath) {
            if (header.length > 0) {
                header += ': ';
            }
            header += this.tc.cyan(d.relFilePath);
            if (typeof d.lineNumber === 'number' && d.lineNumber > -1) {
                header += this.tc.dim(`:`);
                header += this.tc.yellow(`${d.lineNumber}`);
                if (typeof d.columnNumber === 'number' && d.columnNumber > -1) {
                    header += this.tc.dim(`:`);
                    header += this.tc.yellow(`${d.columnNumber}`);
                }
            }
        }
        if (header.length > 0) {
            outputLines.unshift(INDENT + header);
        }
        outputLines.push('');
        if (d.lines && d.lines.length) {
            const lines = prepareLines(d.lines);
            lines.forEach(l => {
                if (!isMeaningfulLine(l.text)) {
                    return;
                }
                let msg = `L${l.lineNumber}:  `;
                while (msg.length < INDENT.length) {
                    msg = ' ' + msg;
                }
                let text = l.text;
                if (l.errorCharStart > -1) {
                    text = this.highlightError(text, l.errorCharStart, l.errorLength);
                }
                msg = this.dim(msg);
                if (d.language === 'typescript' || d.language === 'javascript') {
                    msg += this.javaScriptSyntaxHighlight(text);
                }
                else if (d.language === 'scss' || d.language === 'css') {
                    msg += this.cssSyntaxHighlight(text);
                }
                else {
                    msg += text;
                }
                outputLines.push(msg);
            });
            outputLines.push('');
        }
        if (d.level === 'error') {
            this.errorPrefix(outputLines);
        }
        else if (d.level === 'warn') {
            this.warnPrefix(outputLines);
        }
        else if (d.level === 'debug') {
            this.debugPrefix(outputLines);
        }
        else {
            this.infoPrefix(outputLines);
        }
        return outputLines;
    }
    highlightError(errorLine, errorCharStart, errorLength) {
        let rightSideChars = errorLine.length - errorCharStart + errorLength - 1;
        while (errorLine.length + INDENT.length > MAX_COLUMNS) {
            if (errorCharStart > (errorLine.length - errorCharStart + errorLength) && errorCharStart > 5) {
                // larger on left side
                errorLine = errorLine.substr(1);
                errorCharStart--;
            }
            else if (rightSideChars > 1) {
                // larger on right side
                errorLine = errorLine.substr(0, errorLine.length - 1);
                rightSideChars--;
            }
            else {
                break;
            }
        }
        const lineChars = [];
        const lineLength = Math.max(errorLine.length, errorCharStart + errorLength);
        for (var i = 0; i < lineLength; i++) {
            var chr = errorLine.charAt(i);
            if (i >= errorCharStart && i < errorCharStart + errorLength) {
                chr = this.tc.bgRed(chr === '' ? ' ' : chr);
            }
            lineChars.push(chr);
        }
        return lineChars.join('');
    }
    javaScriptSyntaxHighlight(text) {
        if (text.trim().startsWith('//')) {
            return this.dim(text);
        }
        const words = text.split(' ').map(word => {
            if (JS_KEYWORDS.indexOf(word) > -1) {
                return this.tc.cyan(word);
            }
            return word;
        });
        return words.join(' ');
    }
    cssSyntaxHighlight(text) {
        let cssProp = true;
        const safeChars = 'abcdefghijklmnopqrstuvwxyz-_';
        const notProp = '.#,:}@$[]/*';
        const chars = [];
        for (var i = 0; i < text.length; i++) {
            const c = text.charAt(i);
            if (c === ';' || c === '{') {
                cssProp = true;
            }
            else if (notProp.indexOf(c) > -1) {
                cssProp = false;
            }
            if (cssProp && safeChars.indexOf(c.toLowerCase()) > -1) {
                chars.push(this.tc.cyan(c));
                continue;
            }
            chars.push(c);
        }
        return chars.join('');
    }
}
class CmdTimeSpan {
    constructor(logger, startMsg, debug, appendTo) {
        this.debug = debug;
        this.appendTo = appendTo;
        this.logger = logger;
        this.start = Date.now();
        this.logger.timespanStart(startMsg, debug, this.appendTo);
    }
    finish(msg, color, bold, newLineSuffix) {
        const duration = Date.now() - this.start;
        let time;
        if (duration > 1000) {
            time = 'in ' + (duration / 1000).toFixed(2) + ' s';
        }
        else {
            const ms = parseFloat((duration).toFixed(3));
            if (ms > 0) {
                time = 'in ' + duration + ' ms';
            }
            else {
                time = 'in less than 1 ms';
            }
        }
        this.logger.timespanFinish(msg, time, color, bold, newLineSuffix, this.debug, this.appendTo);
    }
}
const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
function getColumns() {
    const terminalWidth = (process.stdout && process.stdout.columns) || 80;
    return Math.max(Math.min(MAX_COLUMNS, terminalWidth), MIN_COLUMNS);
}
function wordWrap(msg, columns) {
    const lines = [];
    const words = [];
    msg.forEach(m => {
        if (m === null) {
            words.push('null');
        }
        else if (typeof m === 'undefined') {
            words.push('undefined');
        }
        else if (typeof m === 'string') {
            m.replace(/\s/gm, ' ').split(' ').forEach(strWord => {
                if (strWord.trim().length) {
                    words.push(strWord.trim());
                }
            });
        }
        else if (typeof m === 'number' || typeof m === 'boolean' || typeof m === 'function') {
            words.push(m.toString());
        }
        else if (Array.isArray(m)) {
            words.push(() => {
                return m.toString();
            });
        }
        else if (Object(m) === m) {
            words.push(() => {
                return m.toString();
            });
        }
        else {
            words.push(m.toString());
        }
    });
    let line = INDENT;
    words.forEach(word => {
        if (lines.length > 25) {
            return;
        }
        if (typeof word === 'function') {
            if (line.trim().length) {
                lines.push(line);
            }
            lines.push(word());
            line = INDENT;
        }
        else if (INDENT.length + word.length > columns - 1) {
            // word is too long to play nice, just give it its own line
            if (line.trim().length) {
                lines.push(line);
            }
            lines.push(INDENT + word);
            line = INDENT;
        }
        else if ((word.length + line.length) > columns - 1) {
            // this word would make the line too long
            // print the line now, then start a new one
            lines.push(line);
            line = INDENT + word + ' ';
        }
        else {
            line += word + ' ';
        }
    });
    if (line.trim().length) {
        lines.push(line);
    }
    return lines.map(line => {
        return line.trimRight();
    });
}
function prepareLines(orgLines) {
    const lines = JSON.parse(JSON.stringify(orgLines));
    for (let i = 0; i < 100; i++) {
        if (!eachLineHasLeadingWhitespace(lines)) {
            return lines;
        }
        for (let i = 0; i < lines.length; i++) {
            lines[i].text = lines[i].text.substr(1);
            lines[i].errorCharStart--;
            if (!(lines[i]).text.length) {
                return lines;
            }
        }
    }
    return lines;
}
function eachLineHasLeadingWhitespace(lines) {
    if (!lines.length) {
        return false;
    }
    for (var i = 0; i < lines.length; i++) {
        if (!lines[i].text || lines[i].text.length < 1) {
            return false;
        }
        const firstChar = lines[i].text.charAt(0);
        if (firstChar !== ' ' && firstChar !== '\t') {
            return false;
        }
    }
    return true;
}
function isMeaningfulLine(line) {
    if (line) {
        line = line.trim();
        return line.length > 0;
    }
    return false;
}
const JS_KEYWORDS = [
    'abstract', 'any', 'as', 'break', 'boolean', 'case', 'catch', 'class',
    'console', 'const', 'continue', 'debugger', 'declare', 'default', 'delete',
    'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'from',
    'function', 'get', 'if', 'import', 'in', 'implements', 'Infinity',
    'instanceof', 'let', 'module', 'namespace', 'NaN', 'new', 'number', 'null',
    'public', 'private', 'protected', 'require', 'return', 'static', 'set',
    'string', 'super', 'switch', 'this', 'throw', 'try', 'true', 'type',
    'typeof', 'undefined', 'var', 'void', 'with', 'while', 'yield',
];
const INDENT = '           ';
const MIN_COLUMNS = 60;
const MAX_COLUMNS = 120;

function createServer(compilerCtx, outputTarget) {
    if (compilerCtx.localPrerenderServer)
        return;
    const fs$$1 = require('fs');
    const http = require('http');
    compilerCtx.localPrerenderServer = http.createServer((request, response) => {
        const filePath = getFilePath(outputTarget, request.url);
        fs$$1.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                response.write(`<!--localPrerenderServer, error fetching: ${request.url} : ${err} -->`);
            }
            else {
                response.write(data);
            }
            response.end();
        });
    });
    compilerCtx.localPrerenderServer.listen(PORT);
}
function getFilePath(outputTarget, url$$1) {
    const path$$1 = require('path');
    const Url = require('url');
    const parsedUrl = Url.parse(url$$1);
    let pathname = parsedUrl.pathname;
    if (pathname.charAt(0) !== '/') {
        pathname = '/' + pathname;
    }
    if (pathname.startsWith(outputTarget.baseUrl)) {
        pathname = pathname.substring(outputTarget.baseUrl.length);
    }
    const filePath = path$$1.join(outputTarget.dir, pathname);
    return filePath;
}
function normalizeUrl(url$$1) {
    const Url = require('url');
    const parsedUrl = Url.parse(url$$1);
    if (!parsedUrl.protocol || !parsedUrl.hostname) {
        parsedUrl.protocol = 'http:';
        parsedUrl.host = 'localhost:' + PORT;
        url$$1 = Url.format(parsedUrl);
    }
    return url$$1;
}
const PORT = 53536;

function createContext(compilerCtx, outputTarget, sandbox) {
    const vm = require('vm');
    // https://github.com/tmpvar/jsdom/issues/1724
    // manually adding a fetch polyfill until jsdom adds it
    patchFetch(compilerCtx, outputTarget, sandbox);
    patchRaf(sandbox);
    return vm.createContext(sandbox);
}
function patchFetch(compilerCtx, outputTarget, sandbox) {
    function fetch(input, init) {
        const path$$1 = require('path');
        const nf = require(path$$1.join(__dirname, './node-fetch.js'));
        createServer(compilerCtx, outputTarget);
        if (typeof input === 'string') {
            // fetch(url)
            return nf.nodeFetch(normalizeUrl(input), init);
        }
        else {
            // fetch(Request)
            input.url = normalizeUrl(input.url);
            return nf.nodeFetch(input, init);
        }
    }
    sandbox.fetch = fetch;
}
function patchRaf(sandbox) {
    if (!sandbox.requestAnimationFrame) {
        sandbox.requestAnimationFrame = function (callback) {
            const id = sandbox.setTimeout(function () {
                callback(Date.now());
            }, 0);
            return id;
        };
        sandbox.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}
function runInContext(code, contextifiedSandbox, options) {
    const vm = require('vm');
    vm.runInContext(code, contextifiedSandbox, options);
}

function createFsWatcher(events$$1, paths, opts) {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(paths, opts);
    watcher
        .on('change', (path$$1) => {
        events$$1.emit('fileUpdate', path$$1);
    })
        .on('add', (path$$1) => {
        events$$1.emit('fileAdd', path$$1);
    })
        .on('unlink', (path$$1) => {
        events$$1.emit('fileDelete', path$$1);
    })
        .on('addDir', (path$$1) => {
        events$$1.emit('dirAdd', path$$1);
    })
        .on('unlinkDir', (path$$1) => {
        events$$1.emit('dirDelete', path$$1);
    })
        .on('error', (err) => {
        console.error(err);
    });
    return watcher;
}

function createDom() {
    let dom = null;
    return {
        parse(opts) {
            if (dom) {
                dom.window.close();
            }
            const jsdom = require('jsdom');
            const jsdomOptions = {
                url: opts.url,
                referrer: opts.referrer,
                userAgent: opts.userAgent
            };
            if (opts.console) {
                jsdomOptions.virtualConsole = new jsdom.VirtualConsole();
                jsdomOptions.virtualConsole.sendTo(opts.console);
            }
            dom = new jsdom.JSDOM(opts.html, jsdomOptions);
            polyfillJsDom(dom.window);
            return dom.window;
        },
        serialize() {
            return dom.serialize();
        },
        destroy() {
            dom && dom.window && dom.window.close();
            dom = null;
        }
    };
}
function polyfillJsDom(window) {
    if (!window.Element.prototype.closest) {
        window.Element.prototype.closest = function (selector) {
            let el = this;
            while (el) {
                if (el.matches(selector)) {
                    return el;
                }
                el = el.parentElement;
            }
        };
    }
}

function loadConfigFile(fs$$1, configPath, process) {
    let config;
    let cwd = '';
    if (process) {
        if (process.cwd) {
            cwd = process.cwd();
        }
        if (process.env && typeof process.env.PWD === 'string') {
            cwd = process.env.PWD;
        }
    }
    let hasConfigFile = false;
    if (typeof configPath === 'string') {
        if (!path.isAbsolute(configPath)) {
            throw new Error(`Stencil configuration file "${configPath}" must be an absolute path.`);
        }
        try {
            const stat = fs$$1.statSync(configPath);
            if (stat.isFile()) {
                hasConfigFile = true;
            }
            else if (stat.isDirectory()) {
                configPath = getConfigPathFromDirectory(fs$$1, configPath);
                hasConfigFile = (configPath != null);
            }
        }
        catch (e) { }
    }
    if (hasConfigFile) {
        // the passed in config was a string, so it's probably a path to the config we need to load
        // first clear the require cache so we don't get the same file
        const configFileData = requireConfigFile(fs$$1, configPath);
        if (!configFileData.config) {
            throw new Error(`Invalid Stencil configuration file "${configPath}". Missing "config" property.`);
        }
        config = configFileData.config;
        config.configPath = configPath;
        if (!config.rootDir && configPath) {
            config.rootDir = path.dirname(configPath);
        }
    }
    else {
        // no stencil.config.ts or .js file, which is fine
        // #0CJS
        config = {
            rootDir: cwd
        };
    }
    config.cwd = cwd;
    return config;
}
function getConfigPathFromDirectory(fs$$1, dir) {
    // this is only a directory, so let's make some assumptions
    for (let i = 0; i < CONFIG_FILENAMES.length; i++) {
        try {
            const configFilePath = path.join(dir, CONFIG_FILENAMES[i]);
            const stat = fs$$1.statSync(configFilePath);
            if (stat.isFile()) {
                return configFilePath;
            }
        }
        catch (e) { }
    }
    return null;
}
const CONFIG_FILENAMES = [
    'stencil.config.ts',
    'stencil.config.js'
];
function requireConfigFile(fs$$1, configFilePath) {
    // load up the source code
    let sourceText = fs$$1.readFileSync(configFilePath);
    sourceText = convertSourceConfig(sourceText, configFilePath);
    // ensure we cleared out node's internal require() cache for this file
    delete require.cache[path.resolve(configFilePath)];
    // let's override node's require for a second
    // don't worry, we'll revert this when we're done
    const defaultLoader = require.extensions['.js'];
    require.extensions['.js'] = (module, filename) => {
        if (filename === configFilePath) {
            module._compile(sourceText, filename);
        }
        else {
            defaultLoader(module, filename);
        }
    };
    // let's do this!
    const config = require(configFilePath);
    // all set, let's go ahead and reset the require back to the default
    require.extensions['.js'] = defaultLoader;
    // good work team
    return config;
}
function convertSourceConfig(sourceText, configFilePath) {
    if (configFilePath.endsWith('.ts')) {
        // looks like we've got a typed config file
        // let's transpile it to .js quick
        sourceText = transpileTypedConfig(sourceText, configFilePath);
    }
    else {
        // quick hack to turn a modern es module
        // into and old school commonjs module
        sourceText = sourceText.replace(/export\s+\w+\s+(\w+)/gm, 'exports.$1');
    }
    return sourceText;
}
function transpileTypedConfig(sourceText, filePath) {
    // let's transpile an awesome stencil.config.ts file into
    // a boring stencil.config.js file
    const opts = {
        fileName: filePath,
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            target: ts.ScriptTarget.ES5
        },
        reportDiagnostics: false
    };
    const output = ts.transpileModule(sourceText, opts);
    return output.outputText;
}

class NodeFs {
    copyFile(src, dest) {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(src);
            readStream.on('error', reject);
            const writeStream = fs.createWriteStream(dest);
            writeStream.on('error', reject);
            writeStream.on('close', resolve);
            readStream.pipe(writeStream);
        });
    }
    createReadStream(filePath) {
        return fs.createReadStream(filePath);
    }
    mkdir(dirPath) {
        return new Promise((resolve, reject) => {
            fs.mkdir(dirPath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    mkdirSync(dirPath) {
        fs.mkdirSync(dirPath);
    }
    readdir(dirPath) {
        return new Promise((resolve, reject) => {
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(files);
                }
            });
        });
    }
    readdirSync(dirPath) {
        return fs.readdirSync(dirPath);
    }
    readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(content);
                }
            });
        });
    }
    readFileSync(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }
    rmdir(dirPath) {
        return new Promise((resolve, reject) => {
            fs.rmdir(dirPath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    stat(itemPath) {
        return new Promise((resolve, reject) => {
            fs.stat(itemPath, (err, stats) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(stats);
                }
            });
        });
    }
    statSync(itemPath) {
        return fs.statSync(itemPath);
    }
    unlink(filePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    writeFile(filePath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, { encoding: 'utf8' }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    writeFileSync(filePath, content) {
        return fs.writeFileSync(filePath, content, { encoding: 'utf8' });
    }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class NodeStorage {
    constructor(fs$$1) {
        this.fs = fs$$1;
        const appKey = crypto.createHash('md5').update(__dirname).digest('base64').replace(/\W/g, '');
        const storageFile = `stencil-storage-${appKey}.json`;
        this.storagePath = path.join(os.tmpdir(), storageFile);
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.readData();
            return data[key];
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.readData();
            data[key] = value;
            this.writeData();
        });
    }
    readData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.data) {
                try {
                    const dataStr = yield this.fs.readFile(this.storagePath);
                    this.data = JSON.parse(dataStr);
                }
                catch (e) {
                    this.data = {};
                }
            }
            return this.data;
        });
    }
    writeData() {
        try {
            const dataStr = JSON.stringify(this.data, null, 2);
            this.fs.writeFileSync(this.storagePath, dataStr);
        }
        catch (e) { }
    }
}

/**
 * SSR Attribute Names
 */

const TASK_CANCELED_MSG = `task canceled`;
function normalizePath(str) {
    // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
    // https://github.com/sindresorhus/slash MIT
    // By Sindre Sorhus
    if (typeof str !== 'string') {
        throw new Error(`invalid path to normalize`);
    }
    str = str.trim();
    if (EXTENDED_PATH_REGEX.test(str) || NON_ASCII_REGEX.test(str)) {
        return str;
    }
    str = str.replace(SLASH_REGEX, '/');
    // always remove the trailing /
    // this makes our file cache look ups consistent
    if (str.charAt(str.length - 1) === '/') {
        const colonIndex = str.indexOf(':');
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
const EXTENDED_PATH_REGEX = /^\\\\\?\\/;
const NON_ASCII_REGEX = /[^\x00-\x80]+/;
const SLASH_REGEX = /\\/g;

class WorkerMain extends events.EventEmitter {
    constructor(id, workerModule) {
        super();
        this.id = id;
        this.tasks = [];
        this.exitCode = null;
        this.processQueue = true;
        this.sendQueue = [];
        this.stopped = false;
        this.successfulMessage = false;
        this.totalTasksAssigned = 0;
        this.workerKeys = [];
        this.fork(workerModule);
    }
    fork(workerModule) {
        const filteredArgs = process.execArgv.filter(v => !/^--(debug|inspect)/.test(v));
        const options = {
            execArgv: filteredArgs,
            env: process.env,
            cwd: process.cwd()
        };
        const args = ['--start-worker'];
        this.childProcess = cp.fork(workerModule, args, options);
        this.childProcess.on('message', this.receiveFromWorker.bind(this));
        this.childProcess.once('exit', code => {
            this.exitCode = code;
            this.emit('exit', code);
        });
        this.childProcess.on('error', err => {
            this.emit('error', err);
        });
    }
    run(task) {
        this.totalTasksAssigned++;
        this.tasks.push(task);
        this.sendToWorker({
            taskId: task.taskId,
            method: task.method,
            args: task.args
        });
    }
    sendToWorker(msg) {
        if (!this.processQueue) {
            this.sendQueue.push(msg);
            return;
        }
        const success = this.childProcess.send(msg, error => {
            if (error && error instanceof Error) {
                return;
            }
            this.processQueue = true;
            if (this.sendQueue.length > 0) {
                const queueCopy = this.sendQueue.slice();
                this.sendQueue = [];
                queueCopy.forEach(d => this.sendToWorker(d));
            }
        });
        if (!success || /^win/.test(process.platform)) {
            this.processQueue = false;
        }
    }
    receiveFromWorker(responseFromWorker) {
        this.successfulMessage = true;
        if (this.stopped) {
            return;
        }
        const task = this.tasks.find(t => t.taskId === responseFromWorker.taskId);
        if (!task) {
            return;
        }
        if (responseFromWorker.error) {
            task.reject(responseFromWorker.error);
        }
        else {
            task.resolve(responseFromWorker.value);
        }
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
        this.emit('response', responseFromWorker);
    }
    stop() {
        this.stopped = true;
        for (const task of this.tasks) {
            task.reject(TASK_CANCELED_MSG);
        }
        this.tasks.length = 0;
        if (this.successfulMessage) {
            // we know we've had a successful startup
            // so let's close it down all nice like
            this.childProcess.send({
                exit: true
            });
            setTimeout(() => {
                if (this.exitCode === null) {
                    // fallback if we weren't able to gracefully exit
                    this.childProcess.kill('SIGKILL');
                }
            }, 100);
        }
        else {
            // never had a successful message
            // so something may be hosed up
            // let's just kill it now
            this.childProcess.kill('SIGKILL');
        }
    }
}

class WorkerManager extends events.EventEmitter {
    constructor(modulePath, options) {
        super();
        this.modulePath = modulePath;
        this.options = options;
        this.workerIds = 0;
        this.taskIds = 0;
        this.isEnding = false;
        this.taskQueue = [];
        this.workers = [];
        this.useForkedWorkers = false;
        this.useForkedWorkers = (this.options.maxConcurrentWorkers > 1);
        if (this.useForkedWorkers) {
            this.startWorkers();
        }
    }
    onError(error, workerId) {
        if (error.code === 'ERR_IPC_CHANNEL_CLOSED') {
            return this.stopWorker(workerId);
        }
    }
    onExit(workerId) {
        setTimeout(() => {
            let doQueue = false;
            const worker = this.workers.find(w => w.id === workerId);
            if (worker && worker.tasks.length > 0) {
                for (const task of worker.tasks) {
                    task.retries++;
                    this.taskQueue.unshift(task);
                    doQueue = true;
                }
                worker.tasks.length = 0;
            }
            this.stopWorker(workerId);
            if (doQueue) {
                this.processTaskQueue();
            }
        }, 10);
    }
    startWorkers() {
        while (this.workers.length < this.options.maxConcurrentWorkers) {
            this.startWorker();
        }
    }
    startWorker() {
        const workerId = this.workerIds++;
        const worker = new WorkerMain(workerId, this.modulePath);
        worker.on('response', this.processTaskQueue.bind(this));
        worker.once('exit', () => {
            this.onExit(workerId);
        });
        worker.on('error', err => {
            this.onError(err, workerId);
        });
        this.workers.push(worker);
    }
    stopWorker(workerId) {
        const worker = this.workers.find(w => w.id === workerId);
        if (worker) {
            if (!worker.successfulMessage) {
                // never successfully sent a message
                // so something must be wrong, let's just
                // use the main thread runner from now on
                this.useForkedWorkers = false;
            }
            worker.stop();
            const index = this.workers.indexOf(worker);
            if (index > -1) {
                this.workers.splice(index, 1);
            }
        }
    }
    processTaskQueue() {
        if (this.isEnding || this.taskQueue.length === 0) {
            return;
        }
        this.startWorkers();
        while (this.taskQueue.length > 0) {
            const nextTask = this.taskQueue[0];
            const worker = getWorker(nextTask, this.workers, this.options.maxConcurrentTasksPerWorker);
            if (!worker) {
                break;
            }
            worker.run(this.taskQueue.shift());
        }
    }
    run(method, args, opts = {}) {
        if (this.isEnding) {
            return Promise.reject(TASK_CANCELED_MSG);
        }
        if (this.useForkedWorkers) {
            return new Promise((resolve, reject) => {
                const task = {
                    taskId: this.taskIds++,
                    method: method,
                    args: args,
                    retries: 0,
                    resolve: resolve,
                    reject: reject,
                    isLongRunningTask: !!opts.isLongRunningTask,
                    workerKey: opts.workerKey
                };
                this.taskQueue.push(task);
                this.processTaskQueue();
            });
        }
        if (!this.mainThreadRunner) {
            const workerModule = require(this.modulePath);
            this.mainThreadRunner = new workerModule.createRunner();
        }
        return this.mainThreadRunner(method, args);
    }
    cancelTasks() {
        for (const worker of this.workers) {
            for (const task of worker.tasks) {
                task.reject(TASK_CANCELED_MSG);
            }
            worker.tasks.length = 0;
        }
        this.taskQueue.length = 0;
        this.taskIds = 0;
    }
    destroy() {
        if (!this.isEnding) {
            this.isEnding = true;
            for (const task of this.taskQueue) {
                task.reject(TASK_CANCELED_MSG);
            }
            this.taskQueue.length = 0;
            const workerIds = this.workers.map(w => w.id);
            for (const workerId of workerIds) {
                this.stopWorker(workerId);
            }
        }
    }
}
function getWorker(task, workers, maxConcurrentTasksPerWorker) {
    if (task.workerKey) {
        return getWorkerFromKey(workers, maxConcurrentTasksPerWorker, task.workerKey);
    }
    return getNextWorker(workers, maxConcurrentTasksPerWorker);
}
function getWorkerFromKey(workers, maxConcurrentTasksPerWorker, workerKey) {
    let workerFromKey = workers.find(w => w.workerKeys.includes(workerKey));
    if (workerFromKey) {
        return workerFromKey;
    }
    workerFromKey = getNextWorker(workers, maxConcurrentTasksPerWorker);
    if (!workerFromKey) {
        workerFromKey = workers.find(w => w.workerKeys.length === 0);
        if (!workerFromKey) {
            workerFromKey = workers[0];
        }
    }
    workerFromKey.workerKeys.push(workerKey);
    return workerFromKey;
}
function getNextWorker(workers, maxConcurrentTasksPerWorker) {
    const availableWorkers = workers.filter(w => {
        if (w.stopped) {
            // nope, don't use this worker if it's exiting
            return false;
        }
        if (w.tasks.length >= maxConcurrentTasksPerWorker) {
            // do not use this worker if it's at its max
            return false;
        }
        // see if any of the worker's tasks has a long running task
        if (w.tasks.some(t => t.isLongRunningTask)) {
            // one of the tasks for this worker is a long running task
            // so leave this worker alone and let it focus
            // basically so the many little tasks don't have to wait up on the long task
            // (validatingType locks up the thread, so don't use that thread for the time being!)
            return false;
        }
        // this is an available worker up for the job, bring it!
        return true;
    });
    if (availableWorkers.length === 0) {
        // all workers are pretty tasked at the moment
        // Please come back again. Thank you for your business.
        return null;
    }
    const sorted = availableWorkers.sort((a, b) => {
        // worker with the fewest active tasks first
        if (a.tasks.length < b.tasks.length)
            return -1;
        if (a.tasks.length > b.tasks.length)
            return 1;
        // all workers have the same number of active tasks, so next sort
        // by worker with the fewest total tasks that have been assigned
        if (a.totalTasksAssigned < b.totalTasksAssigned)
            return -1;
        if (a.totalTasksAssigned > b.totalTasksAssigned)
            return 1;
        return 0;
    });
    return sorted[0];
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class NodeSystem {
    constructor(fs$$1) {
        this.resolveModuleCache = {};
        this.destroys = [];
        this.fs = fs$$1 || new NodeFs();
        this.path = path;
        const rootDir = path.join(__dirname, '..', '..', '..');
        this.distDir = path.join(rootDir, 'dist');
        this.sysUtil = require(path.join(this.distDir, 'sys', 'node', 'sys-util.js'));
        try {
            this.packageJsonData = require(path.join(rootDir, 'package.json'));
        }
        catch (e) {
            throw new Error(`unable to resolve "package.json" from: ${rootDir}`);
        }
        try {
            this.typescriptPackageJson = require(this.resolveModule(rootDir, 'typescript'));
        }
        catch (e) {
            throw new Error(`unable to resolve "typescript" from: ${rootDir}`);
        }
        this.storage = new NodeStorage(this.fs);
    }
    initWorkers(maxConcurrentWorkers, maxConcurrentTasksPerWorker) {
        if (this.sysWorker) {
            return this.sysWorker.options;
        }
        const workerModulePath = require.resolve(path.join(this.distDir, 'sys', 'node', 'sys-worker.js'));
        const availableCpus = os.cpus().length;
        if (typeof maxConcurrentWorkers === 'number') {
            maxConcurrentWorkers = Math.max(1, Math.min(availableCpus, maxConcurrentWorkers));
        }
        else {
            maxConcurrentWorkers = availableCpus;
        }
        this.sysWorker = new WorkerManager(workerModulePath, {
            maxConcurrentWorkers: maxConcurrentWorkers,
            maxConcurrentTasksPerWorker: maxConcurrentTasksPerWorker
        });
        this.addDestroy(() => {
            if (this.sysWorker) {
                this.sysWorker.destroy();
            }
        });
        return this.sysWorker.options;
    }
    cancelWorkerTasks() {
        if (this.sysWorker) {
            this.sysWorker.cancelTasks();
        }
    }
    destroy() {
        this.destroys.forEach(destroyFn => {
            destroyFn();
        });
        this.destroys.length = 0;
    }
    addDestroy(fn) {
        this.destroys.push(fn);
    }
    get compiler() {
        return {
            name: this.packageJsonData.name,
            version: this.packageJsonData.version,
            runtime: path.join(this.distDir, 'compiler', 'index.js'),
            typescriptVersion: this.typescriptPackageJson.version
        };
    }
    autoprefixCss(input, opts) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this.sysWorker.run('autoprefixCss', [input, opts]);
        });
    }
    copy(copyTasks) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this.sysWorker.run('copy', [copyTasks], { isLongRunningTask: true });
        });
    }
    get createDom() {
        if (this._existingDom) {
            return this._existingDom;
        }
        return createDom;
    }
    set createDom(val) {
        this._existingDom = val;
    }
    createFsWatcher(events$$1, paths, opts) {
        const fsWatcher = createFsWatcher(events$$1, paths, opts);
        this.addDestroy(() => {
            fsWatcher.close();
        });
        return fsWatcher;
    }
    generateContentHash(content, length) {
        let hash = crypto.createHash('md5')
            .update(content)
            .digest('base64');
        if (typeof length === 'number') {
            hash = hash.replace(/\W/g, '')
                .substr(0, length)
                .toLowerCase();
        }
        return hash;
    }
    getClientCoreFile(opts) {
        const filePath = normalizePath(path.join(this.distDir, 'client', opts.staticName));
        return this.fs.readFile(filePath);
    }
    glob(pattern, opts) {
        return new Promise((resolve, reject) => {
            this.sysUtil.glob(pattern, opts, (err, files) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(files);
                }
            });
        });
    }
    isGlob(str) {
        return this.sysUtil.isGlob(str);
    }
    loadConfigFile(configPath, process) {
        const config = loadConfigFile(this.fs, configPath, process);
        if (!config.sys) {
            config.sys = this;
        }
        return config;
    }
    minifyCss(input, filePath, opts = {}) {
        return this.sysWorker.run('minifyCss', [input, filePath, opts]);
    }
    minifyJs(input, opts) {
        return this.sysWorker.run('minifyJs', [input, opts]);
    }
    minimatch(filePath, pattern, opts) {
        return this.sysUtil.minimatch(filePath, pattern, opts);
    }
    open(p) {
        return this.sysUtil.opn(p);
    }
    get details() {
        const details = {
            cpuModel: '',
            cpus: -1,
            platform: '',
            release: '',
            runtime: 'node',
            runtimeVersion: ''
        };
        try {
            const cpus = os.cpus();
            details.cpuModel = cpus[0].model;
            details.cpus = cpus.length;
            details.platform = os.platform();
            details.release = os.release();
            details.runtimeVersion = process.version;
        }
        catch (e) { }
        return details;
    }
    requestLatestCompilerVersion() {
        return this.sysWorker.run('requestLatestCompilerVersion');
    }
    resolveModule(fromDir, moduleId) {
        const cacheKey = `${fromDir}:${moduleId}`;
        if (this.resolveModuleCache[cacheKey]) {
            return this.resolveModuleCache[cacheKey];
        }
        const Module = require('module');
        fromDir = path.resolve(fromDir);
        const fromFile = path.join(fromDir, 'noop.js');
        let dir = Module._resolveFilename(moduleId, {
            id: fromFile,
            filename: fromFile,
            paths: Module._nodeModulePaths(fromDir)
        });
        const root = path.parse(fromDir).root;
        let packageJsonFilePath;
        while (dir !== root) {
            dir = path.dirname(dir);
            packageJsonFilePath = path.join(dir, 'package.json');
            try {
                fs.accessSync(packageJsonFilePath);
            }
            catch (e) {
                continue;
            }
            this.resolveModuleCache[cacheKey] = packageJsonFilePath;
            return packageJsonFilePath;
        }
        throw new Error(`error loading "${moduleId}" from "${fromDir}"`);
    }
    get rollup() {
        const rollup = require('rollup');
        rollup.plugins = {
            commonjs: require('rollup-plugin-commonjs'),
            nodeResolve: require('rollup-plugin-node-resolve')
        };
        return rollup;
    }
    scopeCss(cssText, scopeId, hostScopeId, slotScopeId) {
        return this.sysWorker.run('scopeCss', [cssText, scopeId, hostScopeId, slotScopeId]);
    }
    get semver() {
        return this.sysUtil.semver;
    }
    transpileToEs5(cwd, input) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this.sysWorker.run('transpileToEs5', [cwd, input]);
        });
    }
    get url() {
        return url;
    }
    validateTypes(compilerOptions, emitDtsFiles, currentWorkingDir, collectionNames, rootTsFiles) {
        return this.sysWorker.run('validateTypes', [compilerOptions, emitDtsFiles, currentWorkingDir, collectionNames, rootTsFiles], { isLongRunningTask: true, workerKey: 'validateTypes' });
    }
    get vm() {
        return {
            createContext,
            runInContext
        };
    }
    get workbox() {
        return require('workbox-build');
    }
}

exports.NodeLogger = NodeLogger;
exports.NodeSystem = NodeSystem;
