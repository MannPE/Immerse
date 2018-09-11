export declare function toHaveClasses(element: HTMLElement, classlist: string[]): {
    message: () => any;
    pass: boolean;
};
export declare function toMatchClasses(element: HTMLElement, classlist: string[]): {
    message: () => any;
    pass: boolean;
};
export declare function toHaveAttributes(element: HTMLElement, attributes: {
    [attr: string]: string;
}): {
    message: () => any;
    pass: boolean;
};
export declare function toMatchAttributes(element: HTMLElement, attributes: {
    [attr: string]: string;
}): {
    message: () => any;
    pass: boolean;
};
export declare function toHaveProperties(instance: any, properties: {
    [prop: string]: any;
}): {
    message: () => any;
    pass: boolean;
};
