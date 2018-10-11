import { BuildConditionals, BuildCtx, CompilerCtx, Config, OutputTargetBuild } from '../../declarations';
export declare function generateCoreBrowser(config: Config, compilerCtx: CompilerCtx, buildCtx: BuildCtx, outputTarget: OutputTargetBuild, globalJsContent: string, buildConditionals: BuildConditionals): Promise<string>;
export declare function wrapCoreJs(config: Config, jsContent: string): string;
export declare const APP_NAMESPACE_PLACEHOLDER = "__APPNAMESPACE__";
