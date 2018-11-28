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
  tag: 'imr-word-item',
  styleUrl: 'word-item.scss'
})

export class WordItem {
  @Prop() value: string;
  @Prop() translation: string;
  @Prop() type: string;
  @Prop() singular: boolean;
  @Prop() insensitive: boolean;
  @Prop() ignoreWhiteSpace: boolean;
  @Element() _el: HTMLElement;


  removeItem(){
    console.log("REMOVING ^");
    chrome.storage.sync.get(['imrkorean'], (result) => {
      let newItems = result['imrkorean']
      let index=0;
      for (; index < newItems.length; index++) {
        const element = newItems[index];
        if(element.value == this.value)
          break;
      }
      console.log("removing item in position:",index)
      delete newItems[index];  
      console.log("gonna sync now");
      chrome.storage.sync.set({'imrkorean':newItems}), function(){
        console.log("deleting this")
      }
      this._el.parentElement.setWords(newItems);
    });
  }

  render() {
    var trashstyle = {color:"red"}
    var checkstyle = {color:"green"}
    return [
          <span class={`${this.type} ${(this.singular ? "singular":"plural")}`}>
            {this.value}
          </span>,
          <input type="text" value={this.translation}/>,
          <a onClick={()=>this.removeItem()}><i class="far fa-trash-alt" style={trashstyle}></i></a>,
          <a><i class="far fa-check-circle" style={checkstyle}></i></a>
    ];
  }
}

