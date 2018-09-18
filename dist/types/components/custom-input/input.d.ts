import '../../stencil.core';
/**
 *
 * @export
 * @class TranslateInput
 * Represents a custom input that includes a title and placeholder.
 * @property {string} word - the value inside of the input.
 * @property {string} description - This will be the title of such input.
 * @property {string} example - The placeholder inside of the input.
 */
export declare class Input {
    word: string;
    description: string;
    example: string;
    render(): JSX.Element;
}
