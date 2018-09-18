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

  componentDidLoad() {
    console.log('didLoad called on landing page');
    // unfortunately necessary hack because Edge
    // dont show the animated youtube video in Edge because
    // pointer-events: none; is broken in Edge
    // just link to the youtube video directly like we do on mobile
    if ((document as any).documentMode || /Edge/.test(navigator.userAgent)) {
      (this.el.querySelector('#youtube-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#launch-video') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#background') as HTMLElement).style.display = 'none';
      (this.el.querySelector('#mobile-video') as HTMLElement).style.display = 'flex';
    }
  }

  render() {
    return (
      <div class="main-wrapper">
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
