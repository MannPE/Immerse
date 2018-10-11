'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var https = require('https');

/**
 * SSR Attribute Names
 */

const TASK_CANCELED_MSG = `task canceled`;
function shouldIgnoreError(msg) {
    return (msg === TASK_CANCELED_MSG);
}
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

function getConfigFilePath(process, sys, configArg) {
    if (configArg) {
        if (!sys.path.isAbsolute(configArg)) {
            // passed in a custom stencil config location
            // but it's relative, so prefix the cwd
            return normalizePath(sys.path.join(process.cwd(), configArg));
        }
        // config path already an absolute path, we're good here
        return normalizePath(configArg);
    }
    // nothing was passed in, use the current working directory
    return normalizePath(process.cwd());
}
function hasError$1(diagnostics) {
    if (!diagnostics) {
        return false;
    }
    return diagnostics.some(d => d.level === 'error' && d.type !== 'runtime');
}

const toLowerCase = (str) => str.toLowerCase();
const dashToPascalCase = (str) => toLowerCase(str).split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');

function parseFlags(process) {
    const flags = {
        task: null
    };
    // cmd line has more priority over npm scripts cmd
    const cmdArgs = process.argv.slice(2);
    if (cmdArgs.length > 0 && cmdArgs[0] && !cmdArgs[0].startsWith('-')) {
        flags.task = cmdArgs[0];
    }
    parseArgs(flags, cmdArgs);
    const npmScriptCmdArgs = getNpmScriptArgs(process);
    parseArgs(flags, npmScriptCmdArgs);
    return flags;
}
function parseArgs(flags, args) {
    ARG_OPTS.boolean.forEach(booleanName => {
        const alias = ARG_OPTS.alias[booleanName];
        const flagKey = configCase(booleanName);
        if (typeof flags[flagKey] !== 'boolean') {
            flags[flagKey] = null;
        }
        args.forEach(cmdArg => {
            if (cmdArg === `--${booleanName}`) {
                flags[flagKey] = true;
            }
            else if (cmdArg === `--no-${booleanName}`) {
                flags[flagKey] = false;
            }
            else if (alias && cmdArg === `-${alias}`) {
                flags[flagKey] = true;
            }
        });
    });
    ARG_OPTS.string.forEach(stringName => {
        const alias = ARG_OPTS.alias[stringName];
        const flagKey = configCase(stringName);
        if (typeof flags[flagKey] !== 'string') {
            flags[flagKey] = null;
        }
        for (let i = 0; i < args.length; i++) {
            const cmdArg = args[i];
            if (cmdArg.startsWith(`--${stringName}=`)) {
                const values = cmdArg.split('=');
                values.shift();
                flags[flagKey] = values.join('=');
            }
            else if (cmdArg === `--${stringName}`) {
                flags[flagKey] = args[i + 1];
            }
            else if (alias) {
                if (cmdArg.startsWith(`-${alias}=`)) {
                    const values = cmdArg.split('=');
                    values.shift();
                    flags[flagKey] = values.join('=');
                }
                else if (cmdArg === `-${alias}`) {
                    flags[flagKey] = args[i + 1];
                }
            }
        }
    });
    ARG_OPTS.number.forEach(numberName => {
        const alias = ARG_OPTS.alias[numberName];
        const flagKey = configCase(numberName);
        if (typeof flags[flagKey] !== 'number') {
            flags[flagKey] = null;
        }
        for (let i = 0; i < args.length; i++) {
            const cmdArg = args[i];
            if (cmdArg.startsWith(`--${numberName}=`)) {
                const values = cmdArg.split('=');
                values.shift();
                flags[flagKey] = parseInt(values.join(''), 10);
            }
            else if (cmdArg === `--${numberName}`) {
                flags[flagKey] = parseInt(args[i + 1], 10);
            }
            else if (alias) {
                if (cmdArg.startsWith(`-${alias}=`)) {
                    const values = cmdArg.split('=');
                    values.shift();
                    flags[flagKey] = parseInt(values.join(''), 10);
                }
                else if (cmdArg === `-${alias}`) {
                    flags[flagKey] = parseInt(args[i + 1], 10);
                }
            }
        }
    });
    return flags;
}
function configCase(prop) {
    prop = dashToPascalCase(prop);
    return prop.charAt(0).toLowerCase() + prop.substr(1);
}
const ARG_OPTS = {
    boolean: [
        'cache',
        'check-version',
        'debug',
        'dev',
        'docs',
        'es5',
        'help',
        'log',
        'open',
        'prerender',
        'service-worker',
        'prod',
        'serve',
        'skip-node-check',
        'stats',
        'version',
        'watch'
    ],
    number: [
        'max-workers',
        'port'
    ],
    string: [
        'address',
        'config',
        'docs-json',
        'log-level',
        'root'
    ],
    alias: {
        'config': 'c',
        'help': 'h',
        'port': 'p',
        'version': 'v'
    }
};
function getNpmScriptArgs(process) {
    // process.env.npm_config_argv
    // {"remain":["4444"],"cooked":["run","serve","--port","4444"],"original":["run","serve","--port","4444"]}
    let args = [];
    try {
        if (process.env) {
            const npmConfigArgs = process.env.npm_config_argv;
            if (npmConfigArgs) {
                args = JSON.parse(npmConfigArgs).original;
                args.shift();
            }
        }
    }
    catch (e) { }
    return args;
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getLatestCompilerVersion(sys, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lastCheck = yield getLastCheck(sys.storage);
            if (lastCheck == null) {
                // we've never check before, so probably first install, so don't bother
                // save that we did just do a check though
                yield setLastCheck(sys.storage);
                return null;
            }
            if (!requiresCheck(Date.now(), lastCheck, CHECK_INTERVAL)) {
                // within the range that we did a check recently, so don't bother
                return null;
            }
            // remember we just did a check
            yield setLastCheck(sys.storage);
            const latestVersion = yield sys.requestLatestCompilerVersion();
            return latestVersion;
        }
        catch (e) {
            // quietly catch, could have no network connection which is fine
            logger.debug(`checkVersion error: ${e}`);
        }
        return null;
    });
}
function validateCompilerVersion(config, latestVersionPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        const latestVersion = yield latestVersionPromise;
        if (latestVersion == null) {
            return;
        }
        const currentVersion = config.sys.compiler.version;
        if (config.sys.semver.lt(currentVersion, latestVersion)) {
            printUpdateMessage(config.logger, currentVersion, latestVersion);
        }
    });
}
function requestLatestCompilerVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield request(REGISTRY_URL);
        const data = JSON.parse(body);
        return data['dist-tags'].latest;
    });
}
function request(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const req = https.request(url, res => {
                if (res.statusCode > 299) {
                    reject(`url: ${url}, staus: ${res.statusCode}`);
                    return;
                }
                res.once('error', reject);
                const ret = [];
                res.once('end', () => {
                    resolve(ret.join(''));
                });
                res.on('data', data => {
                    ret.push(data);
                });
            });
            req.once('error', reject);
            req.end();
        });
    });
}
function requiresCheck(now, lastCheck, checkInterval) {
    return ((lastCheck + checkInterval) < now);
}
const CHECK_INTERVAL = (1000 * 60 * 60 * 24 * 7);
function getLastCheck(storage) {
    return storage.get(STORAGE_KEY);
}
function setLastCheck(storage) {
    storage.set(STORAGE_KEY, Date.now());
}
const STORAGE_KEY = 'last_version_check';
function printUpdateMessage(logger, currentVersion, latestVersion) {
    const msg = [
        `Update available: ${currentVersion} ${ARROW} ${latestVersion}`,
        `To get the latest, please run:`,
        NPM_INSTALL
    ];
    const lineLength = msg[0].length;
    const o = [];
    let top = BOX_TOP_LEFT;
    while (top.length <= lineLength + (PADDING * 2)) {
        top += BOX_HORIZONTAL;
    }
    top += BOX_TOP_RIGHT;
    o.push(top);
    msg.forEach(m => {
        let line = BOX_VERTICAL;
        for (let i = 0; i < PADDING; i++) {
            line += ` `;
        }
        line += m;
        while (line.length <= lineLength + (PADDING * 2)) {
            line += ` `;
        }
        line += BOX_VERTICAL;
        o.push(line);
    });
    let bottom = BOX_BOTTOM_LEFT;
    while (bottom.length <= lineLength + (PADDING * 2)) {
        bottom += BOX_HORIZONTAL;
    }
    bottom += BOX_BOTTOM_RIGHT;
    o.push(bottom);
    let output = `\n${INDENT}${o.join(`\n${INDENT}`)}\n`;
    output = output.replace(currentVersion, logger.red(currentVersion));
    output = output.replace(latestVersion, logger.green(latestVersion));
    output = output.replace(NPM_INSTALL, logger.cyan(NPM_INSTALL));
    console.log(output);
}
const NPM_INSTALL = `npm install @stencil/core`;
const ARROW = `→`;
const BOX_TOP_LEFT = `╭`;
const BOX_TOP_RIGHT = `╮`;
const BOX_BOTTOM_LEFT = `╰`;
const BOX_BOTTOM_RIGHT = `╯`;
const BOX_VERTICAL = `│`;
const BOX_HORIZONTAL = `─`;
const PADDING = 2;
const INDENT = `           `;
const REGISTRY_URL = `https://registry.npmjs.org/@stencil/core`;

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function taskBuild(process, config, flags) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const { Compiler } = require('../compiler/index.js');
        const compiler = new Compiler(config);
        if (!compiler.isValid) {
            process.exit(1);
        }
        const latestVersion = getLatestCompilerVersion(config.sys, config.logger);
        const results = yield compiler.build();
        if (!config.watch && hasError$1(results && results.diagnostics)) {
            config.sys.destroy();
            process.exit(1);
        }
        if (config.watch || (config.devServer && flags.serve)) {
            process.once('SIGINT', () => {
                config.sys.destroy();
            });
        }
        yield validateCompilerVersion(config, latestVersion);
        return results;
    });
}

function taskDocs(process, config) {
    const { Compiler } = require('../compiler/index.js');
    const compiler = new Compiler(config);
    if (!compiler.isValid) {
        process.exit(1);
    }
    return compiler.docs();
}

function taskHelp(process, logger) {
    const p = logger.dim((process.platform === 'win32') ? '>' : '$');
    console.log(`
  ${logger.bold('Build:')} ${logger.dim('Build components for development or production.')}

    ${p} ${logger.green('stencil build [--dev] [--watch] [--prerender] [--debug]')}

      ${logger.green('--dev')} ${logger.dim('...............')} Execute a development build
      ${logger.green('--watch')} ${logger.dim('.............')} Execute a build in watch mode
      ${logger.green('--serve')} ${logger.dim('.............')} Start the dev-server
      ${logger.green('--prerender')} ${logger.dim('.........')} Prerender URLs
      ${logger.green('--stats')} ${logger.dim('.............')} Write stencil-stats.json file
      ${logger.green('--log')} ${logger.dim('...............')} Write stencil-build.log file
      ${logger.green('--config')} ${logger.dim('............')} Set stencil config file
      ${logger.green('--docs')} ${logger.dim('..............')} Generate readme.md docs for each component
      ${logger.green('--debug')} ${logger.dim('.............')} Set the log level to debug

  ${logger.bold('Examples:')}

    ${p} ${logger.green('stencil build --dev --watch --serve')}
    ${p} ${logger.green('stencil build --prerender')}

`);
}

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function taskServe(process, config, flags) {
    return __awaiter$2(this, void 0, void 0, function* () {
        const { Compiler } = require('../compiler/index.js');
        const compiler = new Compiler(config);
        if (!compiler.isValid) {
            process.exit(1);
        }
        config.flags.serve = true;
        config.devServer.openBrowser = false;
        config.devServer.hotReplacement = false;
        config.maxConcurrentWorkers = 1;
        config.devServer.root = process.cwd();
        if (typeof flags.root === 'string') {
            if (!config.sys.path.isAbsolute(config.flags.root)) {
                config.devServer.root = config.sys.path.relative(process.cwd(), flags.root);
            }
        }
        config.devServer.root = normalizePath(config.devServer.root);
        const clientConfig = yield compiler.startDevServer();
        compiler.config.logger.info(`dev server: ${clientConfig.browserUrl}`);
        process.once('SIGINT', () => {
            compiler.config.sys.destroy();
            process.exit(0);
        });
    });
}

var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function taskVersion(config) {
    console.log(config.sys.compiler.version);
}
function taskCheckVersion(config) {
    return __awaiter$3(this, void 0, void 0, function* () {
        try {
            const currentVersion = config.sys.compiler.version;
            const latestVersion = yield requestLatestCompilerVersion();
            if (config.sys.semver.lt(currentVersion, latestVersion)) {
                printUpdateMessage(config.logger, currentVersion, latestVersion);
            }
            else {
                console.log(`${config.logger.cyan(config.sys.compiler.name)} version ${config.logger.green(config.sys.compiler.version)} is the latest version`);
            }
        }
        catch (e) {
            config.logger.error(`unable to load latest compiler version: ${e}`);
            process.exit(1);
        }
    });
}

var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function runTask(process, config, flags) {
    return __awaiter$4(this, void 0, void 0, function* () {
        if (flags.help || flags.task === `help`) {
            taskHelp(process, config.logger);
        }
        else if (flags.version) {
            taskVersion(config);
        }
        else if (flags.checkVersion) {
            yield taskCheckVersion(config);
        }
        else {
            switch (flags.task) {
                case 'build':
                    yield taskBuild(process, config, flags);
                    break;
                case 'docs':
                    yield taskDocs(process, config);
                    break;
                case 'serve':
                    yield taskServe(process, config, flags);
                    break;
                default:
                    config.logger.error(`Invalid stencil command, please see the options below:`);
                    taskHelp(process, config.logger);
                    process.exit(1);
            }
        }
    });
}

var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function run(process, sys, logger) {
    return __awaiter$5(this, void 0, void 0, function* () {
        process.on(`unhandledRejection`, (r) => {
            if (!shouldIgnoreError(r)) {
                logger.error(`unhandledRejection`, r);
            }
        });
        process.title = `Stencil`;
        const flags = parseFlags(process);
        // load the config file
        let config;
        try {
            const configPath = getConfigFilePath(process, sys, flags.config);
            config = sys.loadConfigFile(configPath, process);
        }
        catch (e) {
            logger.error(e);
            process.exit(1);
        }
        try {
            if (!config.logger) {
                // if a logger was not provided then use the
                // default stencil command line logger
                config.logger = logger;
            }
            if (config.logLevel) {
                config.logger.level = config.logLevel;
            }
            if (!config.sys) {
                // if the config was not provided then use the default node sys
                config.sys = sys;
            }
            config.flags = flags;
            process.title = `Stencil: ${config.namespace}`;
            yield runTask(process, config, flags);
        }
        catch (e) {
            if (!shouldIgnoreError(e)) {
                config.logger.error(`uncaught cli error: ${e}`);
                process.exit(1);
            }
        }
    });
}

exports.run = run;
