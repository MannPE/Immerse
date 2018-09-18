import '../stencil.core';
export interface SiteState {
    isLeftSidebarIn: boolean;
    toggleLeftSidebar: () => void;
}
declare const _default: {
    Provider: ({ state, children }: {
        state: SiteState;
        children?: any[];
    }) => any[];
    Consumer: ({ children }: any) => JSX.Element;
    wrapConsumer: (childComponent: any, fieldList: string | ("isLeftSidebarIn" | "toggleLeftSidebar")[]) => ({ children, ...props }: any) => JSX.Element;
    injectProps: (childComponent: any, fieldList: string | ("isLeftSidebarIn" | "toggleLeftSidebar")[]) => void;
};
export default _default;
