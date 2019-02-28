import { Component, Prop, State } from '@stencil/core';
import { addWordToLanguage } from '../../storage-manager/immerse-word-manager';
import { ImmerseWord } from '../../storage-manager/types';
import { Language } from '../../languages/languages';

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
  tag: 'imr-word-item',
  styleUrl: 'word-item.scss'
})

export class WordItem {
  @Prop() value: string;
  @Prop() translation: string;
  @Prop() type: string;
  @Prop() singular: boolean;
  @Prop() caseSensitive: boolean;
  @Prop() ignoreWhiteSpace: boolean;
  @Prop() onDelete: Function;
  @State() expanded: boolean;
  @Prop() altText?: string;

  private _immerseWordObject: ImmerseWord;

  componentDidLoad() {
    this._immerseWordObject = {
      value: this.value,
      translation: this.translation,
      caseSensitive: this.caseSensitive,
      ignoreWhiteSpace: false,
      altText: this.altText? this.altText : this.translation
    };
  }

  handleEditClicked(): void {
    // console.log("saving:",this._immerseWordObject);
    addWordToLanguage(Language.KOREAN,this._immerseWordObject);
  }

  handleTranslationChanged = (event) => {
    this._immerseWordObject.translation = event.target.value;
  }

  handleAltTextChanged = (event) => {
    this._immerseWordObject.altText = event.target.value;
  }



  render() {
    var trashstyle = {color:"red"}
    var checkstyle = {color:"green"}
    return [
      <div class="main-row">
        <a onClick={() => this.expanded = !this.expanded  }><i class={this.expanded?"fas fa-chevron-down" : "fas fa-chevron-right"}></i></a>
        <span class={`${this.type} ${(this.singular ? "singular":"plural")}`}>
          {this.value}
        </span>
        <input type="text" value={this.translation} onInput={this.handleTranslationChanged}/>
        <a onClick={() => this.onDelete() }><i class="far fa-trash-alt" style={trashstyle}></i></a>
        <a onClick={() => this.handleEditClicked()}><i class="far fa-check-circle" style={checkstyle}></i></a>
      </div>,
      this.expanded ? 
      <div class="details-row">
        <div class="checkbox-setting">
          <input type="checkbox" checked={this.caseSensitive}/> <span>Case Sensitive </span>
        </div>
        <div class="alt-text">
        <span> Tooltip </span> <input type="text" value={this.altText ? this.altText : this.translation} onInput={this.handleAltTextChanged}/>
        </div>
      </div>: null
    ];
  }
}

