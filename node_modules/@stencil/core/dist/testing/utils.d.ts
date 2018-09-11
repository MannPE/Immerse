import { BuildResults, InMemoryFileSystem } from '../declarations';
export declare function testProperties(instance: any, properties: {
    [prop: string]: any;
}): void;
export declare function testClasslist(el: HTMLElement, classes: string[]): void;
export declare function testAttributes(el: HTMLElement, attributes: {
    [attr: string]: string;
}): void;
export declare function testMatchClasslist(el: HTMLElement, classes: string[]): void;
export declare function testMatchAttributes(el: HTMLElement, attributes: {
    [attr: string]: string;
}): void;
export declare function expectFiles(fs: InMemoryFileSystem, filePaths: string[]): void;
export declare function doNotExpectFiles(fs: InMemoryFileSystem, filePaths: string[]): void;
export declare function wroteFile(r: BuildResults, p: string): boolean;
