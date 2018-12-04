import { Component, Element, State } from '@stencil/core';
import { Ban } from './icons'

@Component({
  tag: 'imr-view-main',
  styleUrl: 'view-main.scss'
})
export class MainPage {


  @Element() el: Element;
  @State() pageBlocked: boolean = false;

  constructor() {
    document.title = `Immerse`;
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
    console.log("Adding the following word:", this.settings);
    chrome.storage.local.get(['imrkorean'], (result) => {
      console.log("Results saved:", result);
      let newItems = result['imrkorean']
      this.pushAlphabetically(newItems, this.settings);
      console.log("New wordList:", newItems);
      chrome.storage.local.set({'imrkorean':newItems}), function(msg){
        console.log("adding word to list: "+msg)
      }
      let inputs  = this.el.querySelectorAll("input")
      inputs.forEach(function(imrinput){
        imrinput.value = "";
      });
    });
  }

  pushAlphabetically(array, item){
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

  getActiveUrl(){
    chrome.tabs.getCurrent((res) => {
      console.log("current tab is:", res)
    })
  }

  render() {
    return [
      <div class="toolbar">
     <i class={"toolbar-icon "+ (this.pageBlocked ? "danger" : "inactive")} > <Ban /> </i>
      </div>,
      <div class="main-wrapper">
          <img width="150" src="assets/img/flags/kr.svg" />
          <h1> Immerse </h1>
          <imr-input description="Word" example="yes" onChange={(event:UIEvent) => this.valueBind(event)} />
          <imr-input description="Translation" example="네" onChange={(event:UIEvent) => this.translationBind(event)} />
          <div class="main-settings">
            <div class="checkbox-setting">
              <input type="checkbox" /> <span>Case Sensitive </span>
            </div>
            <div class="checkbox-setting">
              <input type="checkbox" /> <span>Search inside words </span>
            </div>
          </div>
          <button id="add-button" class="imr-success" onClick={this.addWord}>Add</button>
      </div>
    ];
  }
}
