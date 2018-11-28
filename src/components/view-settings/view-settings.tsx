import { Component } from '@stencil/core';

@Component({
  tag: 'imr-view-settings',
  styleUrl: 'view-settings.scss'
})
export class viewSettings {

  demos = [
    {
      title: 'Stenciljs.com',
      description: 'Yep, this site is built as a PWA!',
      imgPath: '/assets/img/demos/demo-stenciljs',
      demoUrl: 'https://stenciljs.com/',
      sourceUrl: 'https://github.com/ionic-team/stencil-site',
    },
    {
      title: 'IonicHN',
      description: 'Hacker News PWA built with @stencil/core and @ionic/core',
      imgPath: '/assets/img/demos/demo-ionichn',
      demoUrl: 'https://corehacker-10883.firebaseapp.com/',
      sourceUrl: 'https://github.com/ionic-team/ionic-stencil-hn-app'
    },
    {
      title: 'Stencil Fiber demo',
      description: 'This showcases the runtime performance of stencil using our async rendering',
      imgPath: '/assets/img/demos/demo-fiber',
      demoUrl: 'https://stencil-fiber-demo.firebaseapp.com/',
      sourceUrl: 'https://github.com/ionic-team/stencil-fiber-demo'
    },
  ];

  constructor() {
    document.title = `PWAs`;
  }

  openFile = () =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("started to open file")
      chrome.tabs.executeScript(tabs[0].id, {file: "extension/bg/importFile.js"});
    });
  }

  exportFile = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("saving file..")
      chrome.tabs.executeScript(tabs[0].id, {file: "extension/bg/exportFile.js"});
      console.log("Saving finished")
    });
  }

  render() {
    return (
      <div>
        <div class="measure-lg">
          <h4>Import words</h4>
          <p>
            <button onClick={this.openFile}> IMPORT </button>
          </p>
          
          <h4>Export wordlist</h4>
          <p>
            <button onClick={this.exportFile}> EXPORT </button>
          </p>
          <h4>Default settings</h4>
          <p>
            The Ionic PWA Toolkit uses the Stencil Router.
            <stencil-route-link url="docs/routing" class="block">
              Read more about the Stencil Router
            </stencil-route-link>
          </p>

        </div>
      </div>
    );
  }
}
