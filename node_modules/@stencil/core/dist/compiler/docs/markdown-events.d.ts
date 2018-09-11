import { EventMeta } from '../../declarations';
export declare class MarkdownEvents {
    private rows;
    addRow(eventMeta: EventMeta): void;
    toMarkdown(): string[];
}
