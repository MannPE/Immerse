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

  reload = function(){
    document.getElementById('reload').onclick = function(){
      chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log("SENT GREETING atm");
        console.log(response);
      });
    }
  }

  render() {
    return (
      <div class="main-wrapper">
        <button id="reload" onClick={this.reload}>RELOAD</button>
        <imr-language-list></imr-language-list>
        <main>
          <h2>Immerse</h2>
          <imr-input description="Old word" example="cat"></imr-input>
          <imr-input description="New word" example="Katze"></imr-input>
          <button id="add-button">Add</button>
        </main>
      </div>
    );
  }
}
