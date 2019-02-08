import { Component, Element, State, Watch, Prop } from '@stencil/core';
import { Ban } from './icons'
import { extractHostname } from './utils'
import { ImmerseWord } from '../../storage-manager/types';
import { addWordToLanguage } from '../../storage-manager/immerse-word-manager';

@Component({
  tag: 'imr-view-main',
  styleUrl: 'view-main.scss'
})
export class MainPage {


  @Element() el: Element;
  @State() pageBlocked: boolean = false;
  blockedDomains: any= [];
  @Prop({mutable:true}) currentDomain: string = "";

  settings: ImmerseWord = {
    caseSensitive: false,
    ignoreWhiteSpace: false,
    translation:"",
    value: ""
  };

  componentWillLoad(){
    this.getCurrentDomainAndBlockedStatus();
  }

  getCurrentDomainAndBlockedStatus = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      this.currentDomain = extractHostname(tabs[0].url).toString();
      chrome.storage.sync.get(['imrdomains'], (result) => {
        this.blockedDomains = result['imrdomains'];
        console.log("Got current domain and block status:", result, this.currentDomain, this.blockedDomains[this.currentDomain]);
        if(this.blockedDomains[this.currentDomain]){
          this.pageBlocked = true;
        }
      });
    });
  }

  addWord = () => {
    if(this.settings.value.length == 0)
      return
    console.log("Adding the following word:", this.settings);
    addWordToLanguage('imrkorean', this.settings);
    let inputs = Array.from(this.el.querySelectorAll("input"));
    inputs.forEach((imrinput) => {
      imrinput.value = "";
    });
  }


  toggleBlockedDomain = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log("Blocking domain: ", extractHostname(tabs[0].url),"adding to list:", this.blockedDomains)
      if(!this.pageBlocked){
        this.blockedDomains[this.currentDomain] = true;
        this.pageBlocked = true;
      }
      else{
        delete this.blockedDomains[this.currentDomain];
        this.pageBlocked = false;
      }
      console.log("new blocked domains:",this.blockedDomains);
      chrome.storage.sync.set({'imrdomains':this.blockedDomains}), function(res){
        console.log(res);
      }
    });
  }

  handleCheckboxChange = (ev: Event) => {
    this.settings.caseSensitive = (ev.srcElement as any).checked;
  } 

  @Watch("currentDomain")
  render() {
    return (
      <div class="main-wrapper">
          <div class="toolbar">
            <i class={"toolbar-icon "+ (this.pageBlocked ? "danger" : "inactive")}
              title={this.pageBlocked ? `Allow immerse on ${this.currentDomain}` : `Block immerse in ${this.currentDomain}` }
              onClick={this.toggleBlockedDomain}> <Ban /> </i>
          </div>
          <img width="150" src="assets/img/flags/kr.svg" />
          <h1> Immerse </h1>
          <imr-input description="Word" example="yes" onChange={(event:UIEvent) => this.valueBind(event)} />
          <imr-input description="Translation" example="네" onChange={(event:UIEvent) => this.translationBind(event)} />
          <div class="main-settings">
            <div class="checkbox-setting">
              <input type="checkbox" onChange={this.handleCheckboxChange}/> <span>Case Sensitive </span>
            </div>
          </div>
          <button id="add-button" class="imr-success" onClick={this.addWord}>Add</button>
      </div>
    );
  }

  valueBind(event){
    this.settings.value = event.target.value;
  }

  translationBind(event){
    this.settings.translation = event.target.value;
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

}
