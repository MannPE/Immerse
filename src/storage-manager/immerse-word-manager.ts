import { ImmerseWord, LanguageString } from "./types";


export async function getLanguageWords(language: LanguageString, callback: (words: ImmerseWord[]) => void): Promise<void> {
    chrome.storage.local.get([`${language}`], (result) => {
        console.log("got items in getLangWords:",result);
        callback(result[language]);
    });
}

export async function addWordToLanguage(language: LanguageString, wordToAdd: ImmerseWord): Promise<void> {
    getLanguageWords(language, (allWords) => {
        pushAlphabetically(allWords, wordToAdd);
        chrome.storage.local.set({ [`${language}`]: allWords }, function() {
            console.log(`Language ${language} is set to `, allWords);
        });
    })
}

export async function removeItem(language: LanguageString, wordValue: string, callback: (words: ImmerseWord[]) => void) {
    console.log("Removing from word manager");
    chrome.storage.local.get([`${language}`], (result) => {
      let newItems: ImmerseWord[] = result['imrkorean']
      let index=0;
      for (; index < newItems.length; index++) {
        const element = newItems[index];
        if(element.value == wordValue)
          break;
      }
      console.log("removing item in position:",index, newItems[index]);
      newItems.splice(index, 1);
      chrome.storage.local.set({ [`${language}`]:newItems }, function(){
        console.log("gonna sync now, with new items", newItems);
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
        console.log(`${current.value} is < ${item.value}`)
        continue;
      }
      else if(currentValue == itemValue){
        console.log(`${current.value} replacing with ${item.translation}}`)
        array[i] = item;
        finished = true;
        break;
      }
      else{
        console.log(`Inserting before ${current.value}`);
        array.splice(i, 0 , item)
        finished = true;
        break;
      }
    }
    if(!finished) //the item will go at the end of the array
      array.push(item);
  }