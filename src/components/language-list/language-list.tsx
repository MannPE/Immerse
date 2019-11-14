import { Component, h, State, Host } from "@stencil/core";
import { LangManager } from "../../languages/lang-manager";
import { Language } from "../../languages/languages";

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
  tag: "imr-language-list",
  styleUrl: "language-list.scss",
  shadow: true
})
export class LanguageList {
  @State() activeLanguage: Language = Language.JAPANESE;
  @State() expanded: boolean = false;

  languages: { name: Language; imgPath: string; alt: string }[] = [
    {
      name: Language.KOREAN,
      imgPath: "/assets/img/flags/korean.png",
      alt: "Korean_KR"
    },
    {
      name: Language.JAPANESE,
      imgPath: "/assets/img/flags/japanese.png",
      alt: "Japan_JP"
    },
    {
      name: Language.GERMAN,
      imgPath: "/assets/img/flags/german.png",
      alt: "German_DE"
    },
    {
      name: Language.FRENCH,
      imgPath: "/assets/img/flags/french.png",
      alt: "French_FR"
    },
    {
      name: Language.SPANISH,
      imgPath: "/assets/img/flags/spanish.png",
      alt: "Spanish_MX"
    }
  ];

  async componentWillLoad() {
    this.activeLanguage = LangManager.instance.getActiveLanguage();
  }

  render() {
    const defaultLang = this.languages.find(x => x.name == this.activeLanguage);
    return (
      <Host>
        <div class="language-selection-preview">
          <img
            src={defaultLang.imgPath}
            alt={defaultLang.alt}
            onClick={() => (this.expanded = !this.expanded)}
          />
        </div>
        <div
          class={`language-selection-dropdown ${
            this.expanded ? "expanded" : "hidden"
          }`}
        >
          {this.expanded
            ? this.languages.map(demo => (
                <div class="language-selection-option">
                  <img
                    src={`${demo.imgPath}`}
                    alt={demo.alt}
                    onClick={() => (this.expanded = false)}
                  />
                </div>
              ))
            : null}
        </div>
      </Host>
    );
  }
}
