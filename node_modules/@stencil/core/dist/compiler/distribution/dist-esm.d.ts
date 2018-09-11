import * as d from '../../declarations';
export declare function generateEsmIndex(config: d.Config, compilerCtx: d.CompilerCtx, outputTarget: d.OutputTargetDist): Promise<void>;
export declare function generateEsmHosts(config: d.Config, compilerCtx: d.CompilerCtx, cmpRegistry: d.ComponentRegistry, outputTarget: d.OutputTarget): Promise<void>;
export declare function appendDefineCustomElementsType(content: string): string;
