import * as d from '../../declarations';
export declare function generateProxies(config: d.Config, compilerCtx: d.CompilerCtx, cmpRegistry: d.ComponentRegistry): Promise<void>;
export declare function generateDistributions(config: d.Config, compilerCtx: d.CompilerCtx, buildCtx: d.BuildCtx): Promise<any>;
export declare function getComponentsDtsSrcFilePath(config: d.Config): string;
export declare function getComponentsDtsTypesFilePath(config: d.Config, outputTarget: d.OutputTargetDist): string;
export declare const COMPONENTS_DTS = "components.d.ts";
