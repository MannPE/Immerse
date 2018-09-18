import { createProviderConsumer } from '@stencil/state-tunnel';
export default createProviderConsumer({
    isLeftSidebarIn: false,
    toggleLeftSidebar: () => { }
}, (subscribe, child) => h("context-consumer", { subscribe: subscribe, renderer: child }));
