import '../../stencil.core';
export declare class MainPage {
    el: Element;
    constructor();
    reload: () => void;
    settings: {
        value: string;
        translation: string;
        caseSensitive: boolean;
        ignoreWhiteSpace: boolean;
    };
    valueBind(event: any): void;
    translationBind(event: any): void;
    addWord: () => void;
    render(): JSX.Element;
}
