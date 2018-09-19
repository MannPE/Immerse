import '../../stencil.core';
export declare class ViewWordList {
    words: {
        "value": string;
        "translation": string;
        "lang": string;
        "type": string;
        "singular": boolean;
    }[];
    render(): JSX.Element[][];
}
