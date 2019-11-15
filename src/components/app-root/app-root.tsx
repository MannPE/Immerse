import '@stencil/router';
import { Component, Element, State, h } from '@stencil/core';
import { LangManager } from '../../languages/lang-manager';

@Component({
  tag: 'imr-app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  elements = ['site-header', 'site-menu', 'app-burger', '.root'];

  @Element() el: HTMLElement;

  @State() hasSetupLanguage: boolean = !!LangManager.instance.getActiveLanguage();

  componentWillLoad() {
    console.log('initial language is:', LangManager.instance.getActiveLanguage());
    LangManager.instance.onLanguageChanged(newLanguage => (this.hasSetupLanguage = !!newLanguage));
  }

  componentDidLoad() {}

  render() {
    return [
      <imr-app-header />,
      <imr-toast />,
      <div class="root">
        <div class="container">
          {this.hasSetupLanguage ? (
            <stencil-router>
              <stencil-route
                routeRender={props => {
                  try {
                    console.log(props);
                    return (
                      <stencil-route-switch>
                        <stencil-route url="/words" component="imr-view-word-list" />
                        <stencil-route url="/settings" component="imr-view-settings" />
                        <stencil-route component="imr-view-main" />
                      </stencil-route-switch>
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            </stencil-router>
          ) : (
            <imr-app-wizard />
          )}
        </div>
        <footer>
          <div class="container">
            <div class="footer__open-source">
              <p>Made by Manuel Puentes</p>
            </div>

            <div class="footer__icons">
              <a
                class="svg-button"
                id="stencil-twitter"
                href="https://twitter.com/stenciljs"
                target="_blank"
                rel="noopener"
                title="Follow me on "
              >
                <app-icon name="twitter"></app-icon>
              </a>
              <a
                class="svg-button"
                id="ionic-forum"
                href="https://stencil-worldwide.herokuapp.com"
                target="_blank"
                rel="noopener"
                title="Join the stencil worldwide slack"
              >
                <app-icon name="slack"></app-icon>
              </a>
            </div>
          </div>
        </footer>
      </div>,
    ];
  }
}
