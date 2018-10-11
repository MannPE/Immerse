export interface BuildConditionals {
    [key: string]: any;
    coreId: 'core' | 'core.pf' | 'esm.es5';
    polyfills: boolean;
    es5: boolean;
    cssVarShim: boolean;
    clientSide: boolean;
    browserModuleLoader: boolean;
    externalModuleLoader: boolean;
    isDev: boolean;
    isProd: boolean;
    devInspector: boolean;
    hotModuleReplacement: boolean;
    verboseError: boolean;
    ssrServerSide: boolean;
    styles: boolean;
    shadowDom: boolean;
    slotPolyfill: boolean;
    hostData: boolean;
    hostTheme: boolean;
    reflectToAttr: boolean;
    element: boolean;
    event: boolean;
    listener: boolean;
    method: boolean;
    propConnect: boolean;
    propContext: boolean;
    watchCallback: boolean;
    cmpDidLoad: boolean;
    cmpWillLoad: boolean;
    cmpDidUpdate: boolean;
    cmpWillUpdate: boolean;
    cmpDidUnload: boolean;
    observeAttr: boolean;
    hasSlot: boolean;
    hasSvg: boolean;
}
declare global {
    var __BUILD_CONDITIONALS__: BuildConditionals;
}
export interface UserBuildConditionals {
    isDev: boolean;
}
