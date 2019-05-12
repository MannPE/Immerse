import { Component } from '@stencil/core';


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
  shadow: true
})

export class LanguageList {
  languages = [
    {
      name: 'KR',
      imgPath: '/assets/img/flags/korean.png',
      alt: 'Korean_KR',
    },
    {
      name: 'DE',
      imgPath: '/assets/img/flags/german.png',
      alt: 'German_DE',
    },
    {
      name: 'FR',
      imgPath: '/assets/img/flags/french.png',
      alt: 'French_FR',
    },
    {
      name: 'ES',
      imgPath: '/assets/img/flags/spanish.png',
      alt: 'Spanish_MX',
    }
  ]
  
  
  render(){
    return (
      <div class="language-selection-carrousel">
      {this.languages.map(demo => 
        <div class="language-selection-option">
          <img src={`${demo.imgPath}`} srcSet={`${demo.imgPath} 1x, ${demo.imgPath}@2x 2x`} alt={demo.alt}/>
        </div>
      )}
      </div>
    );
  }
}
