import { Component, Prop, Watch } from '@stencil/core';

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
export class Input {

  @Prop() word: string;
  @Prop() description: string;
  @Prop() example: string;


  @Watch('word')
  render() {
    console.log("RENDERING INPUT", this.word);
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

