import { ImmerseWord } from "./types";
import {Language } from "../languages/languages";

export async function getLanguageWords(language: Language, callback: (words: ImmerseWord[]) => void): Promise<void> {
    chrome.storage.local.get([`${language}`], (result) => {
        callback(result[language]);
    });
}

export async function addWordToLanguage(language: Language, wordToAdd: ImmerseWord): Promise<void> {
    getLanguageWords(language, (allWords) => {
        pushAlphabetically(allWords, wordToAdd);
        chrome.storage.local.set({ [`${language}`]: allWords }, function() {
        });
    })
}

export async function removeItem(language: Language, wordValue: string, callback: (words: ImmerseWord[]) => void) {
    chrome.storage.local.get([`${language}`], (result) => {
      let newItems: ImmerseWord[] = result[Language.KOREAN]
      let index=0;
      for (; index < newItems.length; index++) {
        const element = newItems[index];
        if(element.value == wordValue)
          break;
      }
      newItems.splice(index, 1);
      chrome.storage.local.set({ [`${language}`]:newItems }, function(){
      });
      callback(newItems);
    });
  }


function pushAlphabetically(array: ImmerseWord[], item: ImmerseWord): void{
    const itemValue = item.value.toUpperCase();
    if(array.length < 1)
      array.push(item);
    let finished: boolean = false;
    for (let i = 0; i < array.length; i++) {
      const current = array[i];
      const currentValue = current.value.toUpperCase();
      if(currentValue < itemValue){
        continue;
      }
      else if(currentValue == itemValue){
        array[i] = item;
        finished = true;
        break;
      }
      else{
        array.splice(i, 0 , item)
        finished = true;
        break;
      }
    }
    if(!finished) //the item will go at the end of the array
      array.push(item);
  }