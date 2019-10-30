import { Component, Prop, Watch, h } from '@stencil/core';

/**
 *
 * @export
 * @class TranslateInput 
 * Represents a custom input that includes a title and placeholder.
 * @property {string} word - the value inside of the input.
 * @property {string} description - This will be the title of such input.
 * @property {string} example - The placeholder inside of the input. 
 */
@Component({
  tag: 'imr-input',
  styleUrl: 'input.scss'
})
export class CustomInput {

  input: HTMLInputElement;
  @Prop() word: string;
  @Prop() description: string;
  @Prop() example: string;

  @Watch('word')
  render() {
    return (
      <div>
        <div class="translate-input">
          <h4>{this.description}</h4>
          <input ref={(el) => this.input = el} type="text" value={this.word} placeholder={this.example}/>
        </div>
      </div> 
    );
  }
}

