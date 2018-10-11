import { SourceMap } from 'magic-string';
interface Options {
    delimiters?: [string, string];
    values?: {
        [key: string]: any;
    };
    sourcemap?: boolean;
}
interface Results {
    code: string;
    map?: SourceMap;
}
export default function replace(options?: Options): {
    name: string;
    transform(code: string, id: string): Results;
};
export {};
