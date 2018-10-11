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
    chrome.storage.sync.get(['imrkorean'], (result) => {
      this.setWords(result['imrkorean']);
      console.log("words loaded into wordlist",this.words);
    });
  }

  @Method()
  loadWords(){
    console.log(this.words);
  }

  @Method()
  setWords(any){
    this.words = any;
    console.log("setting words", any, this.words)
  }

  render() {
    console.log("rendered",this.words);
    if(this.words){
      let wordItems = [];
        for(var key in this.words){
          let word=this.words[key];
          console.log(word);
          wordItems.push(
            <imr-word-item 
              value = {word.value}
              translation = {word.translation}
              insensitive = {word.insensitive}
              ignoreWhiteSpace = {word.ignoreWhiteSpace}
            />);
        }
        return wordItems;
    }
    else
        return <div>NO WORDS</div>
  }
}
