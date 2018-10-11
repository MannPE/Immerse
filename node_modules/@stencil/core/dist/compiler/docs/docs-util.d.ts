import * as d from '../../declarations';
export declare class MarkdownTable {
    private rows;
    addHeader(data: string[]): void;
    addRow(data: string[], isHeader?: boolean): void;
    toMarkdown(): string[];
}
export declare function getMemberDocumentation(jsDoc: d.JsDoc): string;
