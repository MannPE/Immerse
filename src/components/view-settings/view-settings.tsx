import { Component, h } from '@stencil/core';

@Component({
  tag: 'imr-view-settings',
  styleUrl: 'view-settings.scss'
})
export class viewSettings {

  constructor() {
    document.title = `PWAs`;
  }

  openFile = () =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // console.log("started to open file")
      chrome.tabs.executeScript(tabs[0].id, {file: "extension/bg/importFile.js"});
    });
  }

  exportFile = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // console.log("saving file..")
      chrome.tabs.executeScript(tabs[0].id, {file: "extension/bg/exportFile.js"});
      // console.log("Saving finished")
    });
  }

  render() {
    return (
      <div>
        <div class="measure-lg">
          <h4>Import words</h4>
          <p>
            <button onClick={this.openFile} class="imr-setting"> IMPORT </button>
          </p>
          
          <h4>Export wordlist</h4>
          <p>
            <button onClick={this.exportFile} class="imr-setting"> EXPORT </button>
          </p>
          <h4>About</h4>
          <p>
            <h4> ~Permissions</h4>
            <ul>
              <li> activeTab : Runs the script to replace the words on the currently active tab and then stays in the background listening to changes </li>
              <li> all navigation data: This app needs to be able to run on pretty much every webpage. It requests access to all http and https websites</li>
              <li> storage: Utilizes your browser local storage to store the wordlist, translation and settings. Has a 5MB limit.</li>
              <li> contextMenus: Adds a menu item "Add 'word' to immerse" that redirects you to a google translation which you can then copy into the extension</li>
            </ul>
          </p>
          <p>
            <h4> ~Licenses/Tools </h4>
            This application was created thanks to the following libraries and resources:
            <ul>
              <li> <a href="https://fontawesome.com/license" target="_blank" rel="noopener" > Font-awesome </a> </li>
              <li> <a href="https://github.com/FezVrasta/popper.js/blob/master/LICENSE.md" target="_blank" rel="noopener"> Popper JS </a> </li>
              <li> <a href="https://github.com/ionic-team/stencil/blob/master/LICENSE" target="_blank" rel="noopener" > Stencil JS </a> </li>
            </ul>
          </p>

        </div>
      </div>
    );
  }
}
