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

  openFile= () =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("started to open file")
      chrome.tabs.executeScript(tabs[0].id, {file: "extension/bg/importFile.js"});
    });
  }

  render() {
    return (
      <div>
        <div class="measure-lg">
          <h4>Import words</h4>
          <p>
            <button onClick={this.openFile}> Choose File </button>
          </p>

          <h4>Default settings</h4>
          <p>
            The Ionic PWA Toolkit uses the Stencil Router.
            <stencil-route-link url="docs/routing" class="block">
              Read more about the Stencil Router
            </stencil-route-link>
          </p>


          <h4>Service Worker</h4>
          <p>
            When you run <code>npm run build</code> we automatically generate a Service Worker for you using <a href="https://workboxjs.org/">Workbox</a> that handles pre-caching your assets.

            <stencil-route-link url="/docs/service-workers" class="block">
              Read more about Service Workers
            </stencil-route-link>
          </p>

          <h4>Web Manifest</h4>
          <p>
            By default we include a Web Manifest that has all the neccessary entries to get the Add to Homescreen prompt. You can see that
            web manifest <a href="https://github.com/ionic-team/ionic-pwa-toolkit/blob/master/src/manifest.json">here</a>.
          </p>
        </div>

        <h3 class="push">PWAs built with Stencil</h3>
        <div class="demo-card-list">
          {this.demos.map(demo => {
            return (
              <demo-card
                name={demo.title}
                description={demo.description}
                imgPath={demo.imgPath}
                demoUrl={demo.demoUrl}
                sourceUrl={demo.sourceUrl}></demo-card>
            );
          })}
        </div>

      </div>
    );
  }
}
