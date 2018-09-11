import { Component, Prop } from '@stencil/core';

/**
 * @export
 * @class TranslateWord
 * Class representing the element that will be injected into webpages for translated words.
 * @property {string} value - The word that is being replaced
 * @property {string} translation - The word that will replace the old one.
 * @property {string} lang - 2 letter shortened language. IE: ES, EN, DE
 * @property {string} type - The type of word. IE: noun, verb, adverb, etc.
 * @property {boolean} singular - Indicates if the word is for singular or plural 
 */

@Component({
  tag: 'translate-word',
  styleUrl: 'translate-word.scss'
})

export class TranslateWord {

  @Prop() value: string;
  @Prop() translation: string;
  @Prop() lang: string;
  @Prop() type: string;
  @Prop() singular: boolean;

  render() {
    return (
      <div>
          <span class={this.type + " word "+ (this.singular ? "singular":"plural")}>
            {this.value}
          </span>
          <input type="text" value={this.translation}/>
          <a
            class="svg-button"
            rel="noopener"
            title="Remove this word from the immerse list"
          >
            <app-icon name="trash"/>
          </a>
      </div>
    );
  }
}

