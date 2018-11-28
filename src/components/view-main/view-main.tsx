import { Component, Element } from '@stencil/core';
@Component({
  tag: 'imr-view-main',
  styleUrl: 'view-main.scss'
})
export class MainPage {


  @Element() el: Element;

  constructor() {
    document.title = `Immerse`;
  }

  reload = () =>{
      chrome.runtime.sendMessage({message: "reload"}, function(response) {
        console.log("SENT GREETING atm");
      });
    
  }
  settings = {
    value: "",
    translation:"",
    caseSensitive: false,
    ignoreWhiteSpace: false
  };

  valueBind(event){
    this.settings.value = event.target.value;
  }

  translationBind(event){
    this.settings.translation = event.target.value;
  }

  addWord = () =>{
    if(this.settings.value.length == 0)
      return
    chrome.storage.sync.get(['imrkorean'], (result) => {
      let newItems = result['imrkorean']
      newItems[this.settings.value] = this.settings
      chrome.storage.sync.set({'imrkorean':newItems}), function(msg){
        console.log("adding word to list: "+msg)
      }
      let inputs  = this.el.querySelectorAll("input")
      inputs.forEach(function(imrinput){
        imrinput.value = "";
      });
    });
  }

  render() {

    return (
      <div class="main-wrapper">
        <button class="round" onClick={this.reload}><i class="fas fa-redo"></i></button>
        <imr-language-list />
        <main>
          <h2>Immerse</h2>
          <imr-input description="Old word" example="cat" onChange={(event:UIEvent) => this.valueBind(event)} />
          <imr-input description="New word" example="Katze" onChange={(event:UIEvent) => this.translationBind(event)} />
          <button id="add-button" onClick={this.addWord}>Add</button>
        </main>
      </div>
    );
  }
}
