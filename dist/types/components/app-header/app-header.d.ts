import '../../stencil.core';
export declare class AppHeader {
    el: Element;
    isMobileMenuShown: boolean;
    handleResize(): void;
    componentDidLoad(): void;
    showNav(e: any): void;
    hideNav(): void;
    render(): JSX.Element;
}
