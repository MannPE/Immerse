export { h } from '../renderer/vdom/h';
export { transpile } from './test-transpile';
export { TestWindow } from './test-window';
export { spyOnEvent } from './public-utils';
import * as expect from './expect';
export { expect };
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveClasses(classlist: string[]): void;
            toMatchClasses(classlist: string[]): void;
            toHaveAttributes(attributes: {
                [attr: string]: string;
            }): void;
            toMatchAttributes(attributes: {
                [attr: string]: string;
            }): void;
            toHaveProperties(properties: {
                [prop: string]: any;
            }): void;
        }
    }
}
/**
 * DEPRECATED 2018-04-08
 */
import { TestWindowLoadOptions } from './test-window';
/**
 * DEPRECATED: Please use TestWindow instead.
 */
export declare function render(opts: TestWindowLoadOptions): Promise<any>;
/**
 * DEPRECATED: Please use TestWindow instead.
 */
export declare function flush(elm: any): Promise<void>;
