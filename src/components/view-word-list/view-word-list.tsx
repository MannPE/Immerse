import { Component } from '@stencil/core';


@Component({
  tag: 'imr-view-word-list',
  styleUrl: 'view-word-list.scss'
})
export class ViewWordList {
  private words=[
    {
      value:"cat",
      translation:"Katze",
      lang:"de",
      type:"noun",
      singular:true
    },
    {
      value:"dog",
      translation:"Hund",
      lang:"de",
      type:"noun",
      singular:true
    },
    {
      value:"dog",
      translation:"Hund",
      lang:"de",
      type:"noun",
      singular:true
    },
    {
      value:"jump",
      translation:"도역",
      lang:"kr",
      type:"verb",
      singular:true
    }
  ]


  render() {
    return[ 
      this.words.map(word=>(
          <imr-word-item 
            value={word.value}
            translation={word.translation} 
            lang={word.lang}
            type={word.type} 
            singular={word.singular}
          />
    ))];
  }
}
