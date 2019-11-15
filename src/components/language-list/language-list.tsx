import { Component, h, State, Host } from '@stencil/core';
import { LangManager } from '../../languages/lang-manager';
import { Language, LANGUAGE_LIST } from '../../languages/languages';

/**
 *
 * @export
 * @class TranslateFlagList
 * Element consisting of a list of language cards for choosing the current language.
 * @property {any} languages - The structure for this param is an array of custom objects with
 * the following propertis:
 * @property {string} name -The  simple language 2 letter name. IE: KR, DE, ES, etc.
 * @property {string} imgPath - path from src to the flag image.
 * @property {string} alt -The name of the language represented by the flag in case it doesn't load.
 *
 */

@Component({
  tag: 'imr-language-list',
  styleUrl: 'language-list.scss',
  shadow: true,
})
export class LanguageList {
  @State() activeLanguage: Language = null;
  @State() expanded: boolean = false;

  async componentWillLoad() {
    this.activeLanguage = LangManager.instance.getActiveLanguage();
    LangManager.instance.onLanguageChanged(newLang => {
      this.activeLanguage = newLang;
    });
  }

  handleFlagClick(langInfo: Language) {
    this.expanded = false;
    LangManager.instance.changeActiveLanguage(langInfo);
  }

  render() {
    const defaultLang = LANGUAGE_LIST.find(x => x.name == this.activeLanguage);
    return (
      <Host>
        <div class="language-selection-preview">
          <img
            src={defaultLang.imgPath}
            alt={defaultLang.alt}
            onClick={() => (this.expanded = !this.expanded)}
          />
        </div>
        <div class={`language-selection-dropdown ${this.expanded ? 'expanded' : 'hidden'}`}>
          {this.expanded
            ? LANGUAGE_LIST.map(demo => (
                <div class="language-selection-option">
                  <img
                    src={`${demo.imgPath}`}
                    alt={demo.alt}
                    onClick={() => this.handleFlagClick(demo.name)}
                  />
                </div>
              ))
            : null}
        </div>
      </Host>
    );
  }
}
