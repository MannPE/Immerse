import { Component, Element, State, Watch, Prop, h } from '@stencil/core';
import { Ban } from './icons'
import { extractHostname } from './utils'
import { ImmerseWord } from '../../storage-manager/types';
import { addWordToLanguage } from '../../storage-manager/immerse-word-manager';
import { LangManager } from '../../languages/lang-manager';
import { ToastManager } from '../toast/toastManager';

@Component({
  tag: 'imr-view-main',
  styleUrl: 'view-main.scss'
})
export class MainPage {


  @Element() el: Element;
  @State() pageBlocked: boolean = false;
  @Prop({mutable:true}) currentDomain: string = "";

  blockedDomains: any = [];
  firstInput: HTMLInputElement;

  settings: ImmerseWord = {
    caseSensitive: false,
    ignoreWhiteSpace: false,
    translation:"",
    value: ""
  };
  langManager = LangManager.instance;

  componentWillLoad(){
    this.getCurrentDomainAndBlockedStatus();
  }

  componentDidLoad() {
    this.firstInput = this.el.querySelector('#imr-main-word').querySelector('input');
    console.log('Component loaded and firstInput =', this.firstInput);
  }

  getCurrentDomainAndBlockedStatus = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      this.currentDomain = extractHostname(tabs[0].url).toString();
      chrome.storage.sync.get(['imrdomains'], (result) => {
        this.blockedDomains = result['imrdomains'] || {};
        if(this.blockedDomains[this.currentDomain]){
          this.pageBlocked = true;
        }
      });
    });
  }

  addWord = (): void => {
    if(this.settings.value.length == 0)
      return
    console.log("Adding the following word:", this.settings);
    addWordToLanguage(this.langManager.getActiveLanguage(), this.settings);
    let inputs = Array.from(this.el.querySelectorAll("input"));
    inputs.forEach((imrinput) => {
      imrinput.value = "";
    });
    this.firstInput.focus();
  }


  toggleBlockedDomain = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log("Blocking domain: ", extractHostname(tabs[0].url),"adding to list:", this.blockedDomains)
      let toastMessage = "";
      if(!this.pageBlocked) { //page isn't blocked
        this.blockedDomains[this.currentDomain] = true;
        this.pageBlocked = true;
        toastMessage = `Immerse wil not load on ${this.currentDomain}.`;
      }
      else {
        delete this.blockedDomains[this.currentDomain];
        this.pageBlocked = false;
        toastMessage = `Unblocked ${this.currentDomain} from immerse.`;
      }
      chrome.storage.sync.set({'imrdomains':this.blockedDomains}, () => {
        ToastManager.instance.enqueue({message: toastMessage, duration: 3000})
      });
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
              onClick={this.toggleBlockedDomain}> <Ban/> </i>
          </div>
          {/* <img width="150" src="assets/img/flags/kr.svg" /> */}
          <imr-language-list />
          <h1> Immerse </h1>
          <imr-input id="imr-main-word" description="Word" example="yes" onInput={(event:UIEvent) => this.valueBind(event)} />
          <imr-input id="imr-main-translation" description="Translation" example="네" onInput={(event:UIEvent) => this.translationBind(event)} 
            onKeyPress={(e: KeyboardEvent) => {
              if(e.keyCode == 13)
                this.addWord();
            }}/>
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

}
