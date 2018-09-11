export declare interface TestWindow extends Window {
}
export declare class TestWindow {
    load(opts: TestWindowLoadOptions): Promise<any>;
    flush(): Promise<void>;
    window: Window;
    readonly document: Document;
    readonly history: History;
    readonly location: Location;
    readonly navigator: Navigator;
    readonly CustomEvent: typeof CustomEvent;
    readonly Event: typeof Event;
    readonly URL: typeof URL;
}
export interface TestWindowLoadOptions {
    components: any[];
    html: string;
    url?: string;
    userAgent?: string;
    cookie?: string;
    direction?: string;
    language?: string;
}
