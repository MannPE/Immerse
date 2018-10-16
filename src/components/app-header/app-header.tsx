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
        <stencil-route-link url="/"  exact={true} onClick={() => { this.hideNav() }}>
            Immerse
          </stencil-route-link>
          <stencil-route-link url="/words"  exact={true} onClick={() => { this.hideNav() }}>
            Words
          </stencil-route-link>
          <stencil-route-link url="/settings" exact={true} onClick={() => { this.hideNav() }}>
            Settings
          </stencil-route-link>
        </div>
        
      </div>
    );
  }
}
