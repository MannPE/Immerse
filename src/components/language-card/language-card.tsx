import { Component, Prop} from '@stencil/core';

/**
 *
 *
 * @export
 * @class LanguageCard
 */
@Component({
  tag: 'imr-language-card',
  styleUrl: 'language-card.scss'
})
export class LanguageCard {

  @Prop() name: string;
  @Prop() imgPath: string;
  @Prop() alt: string;

  render() {
    return [
      <img src={`${this.imgPath}`} srcSet={`${this.imgPath} 1x, ${this.imgPath}@2x 2x`} alt={this.alt}/>,
      <p>{this.name}</p>
    ];
  }
}
