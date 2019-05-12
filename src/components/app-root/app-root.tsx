import '@stencil/router';
import { Component, Element, Listen, State } from '@stencil/core';

@Component({
  tag: 'imr-app-root',
  styleUrl: 'app-root.scss'
})
export class AppRoot {
  elements = [
    'site-header',
    'site-menu',
    'app-burger',
    '.root'
  ];

  @Element() el: HTMLElement;

  @State() isLeftSidebarIn: boolean;

  @Listen('window:resize')
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768 && this.isLeftSidebarIn) {
        this.isLeftSidebarIn = false;
        document.body.classList.remove('no-scroll');
        this.elements.forEach((el) => {
          this.el.querySelector(el).classList.remove('left-sidebar-in');
        });
      }
    });
  }

  componentDidLoad() {
    this.isLeftSidebarIn = false;
  }


  render() {
    return [
        <imr-app-header />,
        <imr-toast />,
        <div class="root">
          <div class="container">
            <stencil-router>
            <stencil-route routeRender={(props) => {
              try{
                console.log(props)
                return(
                <stencil-route-switch>
                  <stencil-route url="/words" component="imr-view-word-list" />
                  <stencil-route url="/settings" component="imr-view-settings" />
                  <stencil-route component="imr-view-main" />
                </stencil-route-switch>);
              }catch(e){
                console.log(e);
              }

            }} />
            </stencil-router>
          </div>,
          <footer>
            <div class="container">
              <div class="footer__open-source">
                <p>
                  Made by Manuel Puentes
                </p>
              </div>

              <div class="footer__icons">
                <a
                  class="svg-button"
                  id="stencil-twitter"
                  href="https://twitter.com/stenciljs"
                  target="_blank"
                  rel="noopener"
                  title="Follow me on ">
                  <app-icon name="twitter"></app-icon>
                </a>
                <a
                  class="svg-button"
                  id="ionic-forum"
                  href="https://stencil-worldwide.herokuapp.com"
                  target="_blank"
                  rel="noopener"
                  title="Join the stencil worldwide slack">
                  <app-icon name="slack"></app-icon>
                </a>
              </div>
            </div>
          </footer>
        </div>
    ];
  }
}
