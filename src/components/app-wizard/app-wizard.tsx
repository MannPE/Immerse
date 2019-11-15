import { Component, Element, State, Watch, h, Host } from '@stencil/core';
import { LangManager } from '../../languages/lang-manager';
import { LANGUAGE_LIST } from '../../languages/languages';

@Component({
  tag: 'imr-app-wizard',
  styleUrl: 'app-wizard.scss',
})
export class WizardSetup {
  langManager = LangManager.instance;

  @Element() el: Element;
  @State() chosenLanguage = this.langManager.getActiveLanguage();
  componentDidLoad() {
    console.log('Loaded lang list:', LANGUAGE_LIST);
  }
  @Watch('currentDomain')
  render() {
    return (
      <Host>
        <span>What language do yuo want to learn?</span>
        <div>
          {LANGUAGE_LIST.map(lang => (
            <div class="lang-option">
              <span class="lang-name">{lang.standardName}</span>
              <img
                src={lang.imgPath}
                alt={lang.alt}
                class="langFlag"
                onClick={() => this.langManager.changeActiveLanguage(lang.name)}
              />
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
