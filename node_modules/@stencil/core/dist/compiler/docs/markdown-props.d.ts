import * as d from '../../declarations';
export declare class MarkdownProps {
    private rows;
    addRow(memberName: string, memberMeta: d.MemberMeta): void;
    toMarkdown(): string[];
}
