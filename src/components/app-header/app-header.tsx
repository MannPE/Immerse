import { Component, Element, Listen, State } from '@stencil/core';

@Component({
  tag: 'imr-app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {

  @Element() el: Element;

  @State() isMobileMenuShown: boolean;

  @Listen('window:resize')
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        const menu = (this.el.querySelector('.header-menu') as HTMLElement);
        menu.style.display = "";
        this.el.classList.remove('show-mobile-menu');
        document.body.classList.remove('no-scroll');
        this.isMobileMenuShown = false;
      }
    });
  }

  componentDidLoad() {
    this.isMobileMenuShown = false;
  }

  showNav (e) {
    console.log("should show now open", this.isMobileMenuShown,e);
    if (this.isMobileMenuShown) return;
    this.isMobileMenuShown = true;

    const menu = (this.el.querySelector('.header-menu') as HTMLElement);

    menu.style.display = "flex";
    setTimeout(() => {
      this.el.classList.add('show-mobile-menu');
      document.body.classList.add('no-scroll');
    }, 1)
  }

  hideNav () {
    console.log("should show now close", this.isMobileMenuShown);
    if (!this.isMobileMenuShown) return;
    this.isMobileMenuShown = false;

    const menu = (this.el.querySelector('.header-menu') as HTMLElement);

    this.el.classList.remove('show-mobile-menu');
    setTimeout(() => {
      menu.style.display = "none";
      document.body.classList.remove('no-scroll');
    }, 300)
  }

  render() {
    return (
      <div class="container">
        <div class="header-menu">
          <stencil-route-link url="/words"  exact={true} onClick={() => { this.hideNav() }}>
            My Words
          </stencil-route-link>
          <stencil-route-link url="/pwa" exact={true} onClick={() => { this.hideNav() }}>
            Settings
          </stencil-route-link>
          <stencil-route-link url="/resources"  exact={true} onClick={() => { this.hideNav() }}>
            Immerse
          </stencil-route-link>
          <a class="link--external" target="_blank" href="https://github.com/ionic-team/stencil">
            GitHub <app-icon name="targetblank"></app-icon>
          </a>

          <div class="header-close" onClick={() => { this.hideNav() }}>
            <app-icon name="close"></app-icon>
          </div>
        </div>

        <div class="header-overflow" onClick={(e) => { this.showNav(e) }}>
          <app-icon name="more"></app-icon>
        </div>
      </div>
    );
  }
}
