import * as d from '../../declarations';
export declare function minifyInlineScripts(config: d.Config, compilerCtx: d.CompilerCtx, doc: Document, diagnostics: d.Diagnostic[]): Promise<void>;
export declare function minifyInlineStyle(config: d.Config, compilerCtx: d.CompilerCtx, diagnostics: d.Diagnostic[], script: HTMLScriptElement): Promise<void>;
