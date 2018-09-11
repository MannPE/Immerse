import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'main-page',
  styleUrl: 'main-page.scss'
})
export class MainPage {


  @Element() el: Element;

  @Prop({ context: 'isServer' }) private isServer: boolean;

  constructor() {
    document.title = `Stencil`;
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

  openYoutube() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.add('youtube-show');
    background.classList.add('background-show');
  }

  closeBackground() {
    const youtube = (this.el.querySelector('#youtube-video') as HTMLElement);
    const background = (this.el.querySelector('#background') as HTMLElement);

    youtube.classList.remove('youtube-show');
    background.classList.remove('background-show');
  }

  render() {
    return (
      <div>

        <div onClick={() => { this.closeBackground() }} id="background"></div>

        {!this.isServer && window.matchMedia('(min-width: 740px)').matches ? <div id="youtube-video" onClick={() => { this.closeBackground() }}>
          <lazy-iframe src="https://www.youtube.com/embed/UfD-k7aHkQE" width="700" height="450" title="Ionic team at Polymer Summit video" />
        </div>: null}

        <main>
          <translate-flag-list></translate-flag-list>
          <h2>Immerse</h2>
          <translate-input description="Old word" example="cat"></translate-input>
          <translate-input description="New word" example="Katze"></translate-input>
          <button id="add-button">Add</button>
        </main>

      </div>
    );
  }
}
