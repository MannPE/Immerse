import { Component } from '@stencil/core';


@Component({
  tag: 'translate-words-page',
  styleUrl: 'translate-words-page.scss'
})
export class TranslateWordsPage {
  words=[
    {
      "value":"cat",
      "translation":"Katze",
      "lang":"en",
      "type":"noun",
      "singular":true
    },
    {
      "value":"dog",
      "translation":"Hund",
      "lang":"en",
      "type":"noun",
      "singular":true
    }
  ]


  render() {
    return (
      <div>
        {this.words.map(word=>(
            <translate-word 
              value={word.value}
              translation={word.translation} 
              lang={word.lang}
              type={word.type} 
              singular={word.singular}
            />
          ))}
      </div>
    );
  }
}
