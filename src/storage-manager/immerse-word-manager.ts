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
  let allWords = await getLanguageWords(language);
  console.log('[addWordToLanguage] => ', language, wordToAdd);

  try {
    if (allWords.length == 0) {
      allWords = [wordToAdd];
    } else {
      const insertedValue = wordToAdd.value.toUpperCase();
      const newWordIndex = getAlphabeticMatchIndex(allWords, wordToAdd.value);
      const itemAtPositionValue = allWords[newWordIndex].value.toUpperCase();

      if (itemAtPositionValue == insertedValue) {
        allWords[newWordIndex] = wordToAdd;
      } else {
        allWords.splice(newWordIndex, 0, wordToAdd);
      }
    }
    await browser.storage.local.set({ [language]: allWords });
    ToastManager.instance.enqueue({
      message: `Saved word ${wordToAdd.value} : ${wordToAdd.translation}`,
      duration: 2000,
    });
  } catch (e) {
    -ToastManager.instance.enqueue({
      message: `There was an error adding word: ${wordToAdd.value}`,
      duration: 2000,
    });
    console.log('[addWordToLanguage] ERROR => ', e);
  }
}

export async function removeItem(language: Language, wordValue: string): Promise<ImmerseWord[]> {
  const allWords = await getLanguageWords(language);
  const toDeleteIndex = getAlphabeticMatchIndex(allWords, wordValue);

  if (allWords[toDeleteIndex] && allWords[toDeleteIndex].value == wordValue) {
    allWords.splice(toDeleteIndex, 1);
    await browser.storage.local.set({ [language]: allWords });
    ToastManager.instance.enqueue({
      message: `Removed word "${wordValue}" from ${language.toString()}`,
      duration: 2000,
    });
  } else {
    ToastManager.instance.enqueue({
      message: `Could not remove word ${wordValue} from the word list`,
      duration: 2000,
    });
  }

  return allWords;
}

function getAlphabeticMatchIndex(wordList: ImmerseWord[], wordVal: string): number {
  const insertedValue = wordVal.toUpperCase();
  if (wordList.length < 1) return 0;
  else {
    let startPointer = 0;
    let endPointer = wordList.length - 1;
    let midwayPointer = 0;
    for (let i = 0; i < wordList.length; i++) {
      midwayPointer = Math.floor((startPointer + endPointer) / 2);
      const current = wordList[midwayPointer];
      const currentValue = current.value.toUpperCase();
      if (startPointer == endPointer) {
        if (insertedValue < currentValue || insertedValue == currentValue) {
          return midwayPointer;
        } else if (currentValue < insertedValue) {
          return midwayPointer + 1;
        }
      }
      if (insertedValue < currentValue) {
        endPointer = midwayPointer;
      } else if (currentValue < insertedValue) {
        startPointer = midwayPointer + 1; // since we're using math.floor we need to increase this value
      } else {
        return midwayPointer;
      }
    }
    console.log('[addWordToImmerseListAlphabetically]', wordVal, wordList, ' ==> ', midwayPointer);
  }
  return -1;
}
