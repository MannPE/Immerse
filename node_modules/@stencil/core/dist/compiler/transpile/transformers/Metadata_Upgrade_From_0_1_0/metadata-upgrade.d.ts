import * as d from '../../../../declarations';
import * as ts from 'typescript';
export default function upgradeFromMetadata(moduleFiles: d.ModuleFiles): (tsSourceFile: ts.SourceFile) => ts.SourceFile;
