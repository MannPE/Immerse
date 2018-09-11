import { Component, Prop } from '@stencil/core';

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
  tag: 'translate-input',
  styleUrl: 'translate-input.scss'
})
export class TranslateInput {

  @Prop() word: string;
  @Prop() description: string;
  @Prop() example: string;

  render() {
    return (
      <div>
        <div class="translate-input">
          <h4>{this.description}</h4>
          <input type="text" value={this.word} placeholder={this.example}/>
        </div>
      </div> 
    );
  }
}

