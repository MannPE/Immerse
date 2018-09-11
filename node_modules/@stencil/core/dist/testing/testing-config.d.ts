import * as d from '../declarations';
import { TestingLogger } from './testing-logger';
import { TestingSystem } from './testing-sys';
export declare class TestingConfig implements d.Config {
    _isTesting: boolean;
    logger: TestingLogger;
    sys: TestingSystem;
    namespace: string;
    rootDir: string;
    cwd: string;
    globalScript: string;
    devMode: boolean;
    enableCache: boolean;
    buildAppCore: boolean;
    flags: d.ConfigFlags;
    bundles: d.ConfigBundle[];
    outputTargets: d.OutputTarget[];
    buildEs5: boolean;
    hashFileNames: boolean;
    maxConcurrentWorkers: number;
    minifyCss: boolean;
    minifyJs: boolean;
}
