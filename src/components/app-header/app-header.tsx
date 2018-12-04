import { Component, Element, Listen, State } from '@stencil/core';

@Component({
  tag: 'imr-app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {

  @Element() el: Element;

  render() {
    return (
      <div class="container">
        <div class="header-menu">
        <stencil-route-link url="/"  exact={true}>
            Immerse
          </stencil-route-link>
          <stencil-route-link url="/words"  exact={true} >
            Words
          </stencil-route-link>
          <stencil-route-link url="/settings" exact={true} >
            Settings
          </stencil-route-link>
        </div>
        
      </div>
    );
  }
}
