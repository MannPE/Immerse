import { Component, Element , State,  Method} from '@stencil/core';


@Component({
  tag: 'imr-view-word-list',
  styleUrl: 'view-word-list.scss'
})
export class ViewWordList {
  @State() words: any;
  @Element() _el: HTMLElement;
  
 

  componentWillLoad(){
    console.log("Will load");
    chrome.storage.local.get(['imrkorean'], (result) => {
      this.setWords(result['imrkorean']);
    });
  }

  @Method()
  loadWords(){
    console.log(this.words);
  }

  @Method()
  setWords(any){
    var filtered = any.filter(function (el) {
      return el != null;
    });
    this.words = filtered;
    console.log("Found the following words: ",  this.words)
  }

  render() {
    if(this.words){
      let wordItems = [];
        for(var key in this.words){
          let word=this.words[key];
          wordItems.push(
            <imr-word-item 
              value = {word.value}
              translation = {word.translation}
              insensitive = {word.caseSensitive}
              ignoreWhiteSpace = {word.ignoreWhiteSpace}
            />);
        }
        return wordItems;
    }
    else
        return <div>NO WORDS</div>
  }
}
