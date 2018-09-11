import { MemberMeta } from '../../declarations';
export declare class MarkdownAttrs {
    private rows;
    addRow(memberMeta: MemberMeta): void;
    toMarkdown(): string[];
}
