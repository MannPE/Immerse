import { Component, Element , State,  Method} from '@stencil/core';
import { getLanguageWords, removeItem } from '../../storage-manager/immerse-word-manager';
import { ImmerseWord } from '../../storage-manager/types';
import { Language } from '../../languages/languages';


@Component({
  tag: 'imr-view-word-list',
  styleUrl: 'view-word-list.scss'
})

export class ViewWordList {
  @State() words: ImmerseWord[];
  @Element() _el: HTMLElement;
  
  componentWillLoad() {
    getLanguageWords(Language.KOREAN, (wordResults) => {
      // console.log("Component will load set words: ",wordResults);
      this.setWords(wordResults);
    });
  }

  @Method()
  setWords(any: ImmerseWord[]): void {
    var filtered: ImmerseWord[] = any.filter(function (el) {
      return el != null;
    });
    this.words = filtered;
    // console.log("Found the following words: ",  this.words);
  }

  render(): JSX.Element {
    if (this.words) {
      let wordItems = [];
        for(var key in this.words) {
          let word = this.words[key];
          wordItems.push(
            <imr-word-item 
              value = {word.value}
              translation = {word.translation}
              caseSensitive = {word.caseSensitive}
              ignoreWhiteSpace = {word.ignoreWhiteSpace}
              onDelete = { () => removeItem(Language.KOREAN, word.value, (newWordList) => { this.setWords(newWordList) }) } 
              altText = {word.altText}
            />);
        }
        return wordItems;
    }
    else
      return <div>NO WORDS</div>
  }
}
