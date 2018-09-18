import '../../stencil.core';
export declare class LazyIframe {
    src: string;
    name: string;
    frameBorder: string;
    scrolling: string;
    width: string;
    height: string;
    realSrc: string;
    el: HTMLElement;
    io: IntersectionObserver;
    componentDidLoad(): void;
    componentDidUnload(): void;
    handleIframe(): void;
    cleanup(): void;
    render(): JSX.Element;
}
