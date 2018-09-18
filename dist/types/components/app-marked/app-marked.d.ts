import '../../stencil.core';
export declare class AppMarked {
    doc: string;
    content: string;
    componentWillLoad(): Promise<void>;
    fetchNewContent(): Promise<void>;
    render(): JSX.Element[];
}
