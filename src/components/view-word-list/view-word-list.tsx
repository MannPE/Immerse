import { Component, Element, State, Method, h, JSX } from '@stencil/core';
import { getLanguageWords, removeItem } from '../../storage-manager/immerse-word-manager';
import { ImmerseWord } from '../../storage-manager/types';
import { Language } from '../../languages/languages';
import { LangManager } from '../../languages/lang-manager';

@Component({
  tag: 'imr-view-word-list',
  styleUrl: 'view-word-list.scss',
})
export class ViewWordList {
  @State() currentLanguage: Language = null;
  @State() words: ImmerseWord[];
  @Element() _el: HTMLElement;

  componentWillLoad() {
    console.log('list component loading');
    this.currentLanguage = LangManager.instance.getActiveLanguage();
    getLanguageWords(this.currentLanguage, wordResults => {
      console.log('Component will load set words: ', wordResults);
      this.refreshCurrentWordList(wordResults);
    });
  }

  componentWillUpdate() {
    getLanguageWords(this.currentLanguage, wordResults => {
      // console.log("Component will load set words: ",wordResults);
      this.refreshCurrentWordList(wordResults);
    });
  }

  @Method()
  async refreshCurrentWordList(loadedWords: ImmerseWord[]): Promise<void> {
    console.log('refreshing list with:', loadedWords);
    if (!!!loadedWords) {
      this.words = [];
    } else {
      var filtered: ImmerseWord[] = loadedWords.filter(function(el) {
        return el != null;
      });
      this.words = filtered;
      console.log('Found the following words: ', this.words);
    }
  }

  render(): JSX.Element {
    if (this.words) {
      let wordItems = [];
      for (var key in this.words) {
        let word = this.words[key];
        wordItems.push(
          <imr-word-item
            value={word.value}
            translation={word.translation}
            caseSensitive={word.caseSensitive}
            ignoreWhiteSpace={word.ignoreWhiteSpace}
            onDelete={() =>
              removeItem(LangManager.instance.getActiveLanguage(), word.value, newWordList => {
                this.refreshCurrentWordList(newWordList);
              })
            }
            altText={word.altText}
          />
        );
      }
      return wordItems;
    } else return <div>NO WORDS</div>;
  }
}
