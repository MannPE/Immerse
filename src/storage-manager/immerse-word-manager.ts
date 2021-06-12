import { ImmerseWord } from './types';
import { Language } from '../languages/languages';
import { ToastManager } from '../components/toast/toastManager';
import browser from 'webextension-polyfill';

export async function getLanguageWords(
  language: Language,
  callback: (words: ImmerseWord[]) => void
): Promise<void> {
  browser.storage.local.get([language]).then(result => {
    console.log('getLanguageWords() => ', result);
    if (!!result && Object.keys(result).length > 0) callback(Object.values(result[language]));
    else callback([]);
  });
}

export async function addWordToLanguage(language: Language, wordToAdd: ImmerseWord): Promise<void> {
  getLanguageWords(language, allWords => {
    pushAlphabetically(allWords, wordToAdd);
    browser.storage.local.set({ [language]: allWords }).then(function() {
      ToastManager.instance.enqueue({
        message: `Saved word "${wordToAdd.value}" : "${wordToAdd.translation}"`,
        duration: 2000,
      });
    });
  });
}

export async function removeItem(
  language: Language,
  wordValue: string,
  callback: (words: ImmerseWord[]) => void
) {
  browser.storage.local.get([`${language}`]).then(result => {
    let newItems: ImmerseWord[] = result[language];
    let index = 0;
    for (; index < newItems.length; index++) {
      const element = newItems[index];
      if (element.value == wordValue) break;
    }
    newItems.splice(index, 1);
    browser.storage.local.set({ [`${language}`]: newItems }).then(function() {
      ToastManager.instance.enqueue({
        message: `Removed word "${wordValue}" from ${language.toString()}`,
        duration: 2000,
      });
    });
    callback(newItems);
  });
}

function pushAlphabetically(array: ImmerseWord[], item: ImmerseWord): void {
  const itemValue = item.value.toUpperCase();
  if (array.length < 1)
    //empty or null array
    array = [item];
  else {
    let finished: boolean = false;
    for (let i = 0; i < array.length; i++) {
      const current = array[i];
      const currentValue = current.value.toUpperCase();
      if (currentValue < itemValue) {
        continue;
      } else if (currentValue == itemValue) {
        array[i] = item;
        finished = true;
        break;
      } else {
        array.splice(i, 0, item);
        finished = true;
        break;
      }
    }
    if (!finished)
      //the item will go at the end of the array
      array.push(item);
  }
}
