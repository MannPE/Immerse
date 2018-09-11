import { Component, Prop} from '@stencil/core';

/**
 *
 *
 * @export
 * @class LanguageCard
 */
@Component({
  tag: 'language-card',
  styleUrl: 'language-card.scss'
})
export class LanguageCard {

  @Prop() name: string;
  @Prop() imgPath: string;
  @Prop() alt: string;

  render() {
    return (
      <div>
        <div class="demo-card__image">
          <a target="_blank" rel="noopener">
            <img src={`${this.imgPath}`} srcSet={`${this.imgPath} 1x, ${this.imgPath}@2x 2x`} alt={this.alt}/>
          </a>
        </div>
        <p>{this.name}</p>
      </div>
    );
  }
}
