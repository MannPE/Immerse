import { ImmerseWord } from './types';
import { Language } from '../languages/languages';
import { ToastManager } from '../components/toast/toastManager';
import browser from 'webextension-polyfill';

export async function getLanguageWords(language: Language): Promise<ImmerseWord[]> {
  const localLanguage = await browser.storage.local.get(language);
  console.log(`[getLanguageWords] ${language} =>`, localLanguage);
  if (!!localLanguage && Object.keys(localLanguage).length > 0) {
    return Object.values(localLanguage[language]);
  } else return [];
}

export async function addWordToLanguage(language: Language, wordToAdd: ImmerseWord): Promise<void> {
  const allWords = await getLanguageWords(language);
  const newWordList = addWordToListAlphabetically(allWords, wordToAdd);
  console.log('[addWordToLanguage] => ', language, wordToAdd);
  try {
    await browser.storage.local.set({ [language]: newWordList });
    ToastManager.instance.enqueue({
      message: `Saved word ${wordToAdd.value} : ${wordToAdd.translation}`,
      duration: 2000,
    });
  } catch (e) {
    ToastManager.instance.enqueue({
      message: `There was an error adding word: ${wordToAdd.value}`,
      duration: 2000,
    });
    console.log('[addWordToLanguage] ERROR => ', e);
  }
}

export async function removeItem(language: Language, wordValue: string): Promise<ImmerseWord[]> {
  const result = await browser.storage.local.get([`${language}`]);
  let newItems: ImmerseWord[] = result[language];
  let index = 0;
  // TODO optimize algorithm here - All are sorted alphabetically so can use logn lookup instead of n
  for (; index < newItems.length; index++) {
    const element = newItems[index];
    if (element.value == wordValue) break;
  }
  newItems.splice(index, 1);
  await browser.storage.local.set({ [language]: newItems });
  ToastManager.instance.enqueue({
    message: `Removed word "${wordValue}" from ${language.toString()}`,
    duration: 2000,
  });

  return newItems;
}

function addWordToListAlphabetically(wordList: ImmerseWord[], item: ImmerseWord): ImmerseWord[] {
  const insertedValue = item.value.toUpperCase();
  let result = wordList;
  if (!wordList || wordList.length < 1)
    //empty or null array
    result = [item];
  else {
    let startPointer = 0;
    let endPointer = wordList.length - 1;
    for (let i = 0; i < wordList.length; i++) {
      const midwayPointer = Math.floor((startPointer + endPointer) / 2);
      const current = wordList[midwayPointer];
      const currentValue = current.value.toUpperCase();
      if (startPointer == endPointer) {
        // we just need to insert the word here since it's the final slot we'll be visiting
        if (insertedValue < currentValue) {
          result.splice(midwayPointer, 0, item);
        } else if (currentValue < insertedValue) {
          result.splice(midwayPointer + 1, 0, item);
        } else {
          // was an update
          result[midwayPointer] = item;
        }
        break;
      }
      if (insertedValue < currentValue) {
        endPointer = midwayPointer;
      } else if (currentValue < insertedValue) {
        startPointer = midwayPointer + 1; // since we're using math.floor we need to increase this value
      } else {
        // was an update on a word with same value
        result[midwayPointer] = item;
        break;
      }
    }
    console.log('[addWordToImmerseListAlphabetically]', item, wordList, ' ==> ', result);
  }
  return wordList;
}
