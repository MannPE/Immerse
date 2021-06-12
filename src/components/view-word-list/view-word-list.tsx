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

  async componentWillLoad() {
    this.currentLanguage = LangManager.instance.getActiveLanguage();
    const localWords = await getLanguageWords(this.currentLanguage);
    console.log('ViewWordList[componentWillLoad] => ', localWords);
    this.refreshCurrentWordList(localWords);
  }

  async componentWillUpdate() {
    const localWords = await getLanguageWords(this.currentLanguage);
    console.log('ViewWordList[componentWillLoad] => ', localWords);
    this.refreshCurrentWordList(localWords);
  }

  @Method()
  async refreshCurrentWordList(loadedWords: ImmerseWord[]): Promise<void> {
    console.log('[refreshCurrentWordList]  ', loadedWords, this.words);
    if (!!!loadedWords) {
      this.words = [];
    } else {
      var filtered: ImmerseWord[] = loadedWords.filter(el => {
        return el != null;
      });
      this.words = filtered;
    }
  }

  render(): JSX.Element {
    if (this.words && this.words.length > 0) {
      let wordItems = [];
      for (var key in this.words) {
        let word = this.words[key];
        wordItems.push(
          <imr-word-item
            value={word.value}
            translation={word.translation}
            caseSensitive={word.caseSensitive}
            ignoreWhiteSpace={word.ignoreWhiteSpace}
            onDelete={async () => {
              const newWordList = await removeItem(
                LangManager.instance.getActiveLanguage(),
                word.value
              );
              this.refreshCurrentWordList(newWordList);
            }}
            altText={word.altText}
          />
        );
      }
      return wordItems;
    } else {
      return <div class="empty-items-overlay">Go to the first tab and add some words!</div>;
    }
  }
}
