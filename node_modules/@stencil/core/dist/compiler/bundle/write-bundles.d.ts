import * as d from '../../declarations';
import { RollupBuild } from 'rollup';
import { EntryModule } from '../../declarations';
export declare function writeEntryModules(config: d.Config, compilerCtx: d.CompilerCtx, entryModules: EntryModule[]): Promise<void>;
export declare function writeEsModules(config: d.Config, rollupBundle: RollupBuild): Promise<d.JSModuleList>;
export declare function writeLegacyModules(config: d.Config, rollupBundle: RollupBuild, entryModules: d.EntryModule[]): Promise<d.JSModuleList>;
export declare function writeEsmEs5Modules(config: d.Config, rollupBundle: RollupBuild): Promise<d.JSModuleList>;
