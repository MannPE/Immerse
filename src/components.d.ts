/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
/* tslint:disable */

import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';




declare global {
  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}

  namespace StencilComponents {

    interface ImrAppHeader {

    }

    interface AppIcon {
      'name': string;
    }

    interface ImrAppRoot {

    }

    interface ImrInput {
      'description': string;
      'example': string;
      'word': string;
    }

    interface ImrLanguageCard {
      'alt': string;
      'imgPath': string;
      'name': string;
    }

    interface ImrLanguageList {

    }

    interface ImrViewMain {

    }

    interface ImrViewSettings {

    }

    interface ImrViewWordList {
      'loadWords': () => void;
      'setWords': (any: any) => void;
    }

    interface ImrWordItem {
      'ignoreWhiteSpace': boolean;
      'insensitive': boolean;
      'singular': boolean;
      'translation': string;
      'type': string;
      'value': string;
    }
  }


    interface HTMLImrAppHeaderElement extends StencilComponents.ImrAppHeader, HTMLStencilElement {}

    var HTMLImrAppHeaderElement: {
      prototype: HTMLImrAppHeaderElement;
      new (): HTMLImrAppHeaderElement;
    };
    

    interface HTMLAppIconElement extends StencilComponents.AppIcon, HTMLStencilElement {}

    var HTMLAppIconElement: {
      prototype: HTMLAppIconElement;
      new (): HTMLAppIconElement;
    };
    

    interface HTMLImrAppRootElement extends StencilComponents.ImrAppRoot, HTMLStencilElement {}

    var HTMLImrAppRootElement: {
      prototype: HTMLImrAppRootElement;
      new (): HTMLImrAppRootElement;
    };
    

    interface HTMLImrInputElement extends StencilComponents.ImrInput, HTMLStencilElement {}

    var HTMLImrInputElement: {
      prototype: HTMLImrInputElement;
      new (): HTMLImrInputElement;
    };
    

    interface HTMLImrLanguageCardElement extends StencilComponents.ImrLanguageCard, HTMLStencilElement {}

    var HTMLImrLanguageCardElement: {
      prototype: HTMLImrLanguageCardElement;
      new (): HTMLImrLanguageCardElement;
    };
    

    interface HTMLImrLanguageListElement extends StencilComponents.ImrLanguageList, HTMLStencilElement {}

    var HTMLImrLanguageListElement: {
      prototype: HTMLImrLanguageListElement;
      new (): HTMLImrLanguageListElement;
    };
    

    interface HTMLImrViewMainElement extends StencilComponents.ImrViewMain, HTMLStencilElement {}

    var HTMLImrViewMainElement: {
      prototype: HTMLImrViewMainElement;
      new (): HTMLImrViewMainElement;
    };
    

    interface HTMLImrViewSettingsElement extends StencilComponents.ImrViewSettings, HTMLStencilElement {}

    var HTMLImrViewSettingsElement: {
      prototype: HTMLImrViewSettingsElement;
      new (): HTMLImrViewSettingsElement;
    };
    

    interface HTMLImrViewWordListElement extends StencilComponents.ImrViewWordList, HTMLStencilElement {}

    var HTMLImrViewWordListElement: {
      prototype: HTMLImrViewWordListElement;
      new (): HTMLImrViewWordListElement;
    };
    

    interface HTMLImrWordItemElement extends StencilComponents.ImrWordItem, HTMLStencilElement {}

    var HTMLImrWordItemElement: {
      prototype: HTMLImrWordItemElement;
      new (): HTMLImrWordItemElement;
    };
    

  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {
    'imr-app-header': JSXElements.ImrAppHeaderAttributes;
    'app-icon': JSXElements.AppIconAttributes;
    'imr-app-root': JSXElements.ImrAppRootAttributes;
    'imr-input': JSXElements.ImrInputAttributes;
    'imr-language-card': JSXElements.ImrLanguageCardAttributes;
    'imr-language-list': JSXElements.ImrLanguageListAttributes;
    'imr-view-main': JSXElements.ImrViewMainAttributes;
    'imr-view-settings': JSXElements.ImrViewSettingsAttributes;
    'imr-view-word-list': JSXElements.ImrViewWordListAttributes;
    'imr-word-item': JSXElements.ImrWordItemAttributes;
    }
  }

  namespace JSXElements {

    export interface ImrAppHeaderAttributes extends HTMLAttributes {

    }

    export interface AppIconAttributes extends HTMLAttributes {
      'name'?: string;
    }

    export interface ImrAppRootAttributes extends HTMLAttributes {

    }

    export interface ImrInputAttributes extends HTMLAttributes {
      'description'?: string;
      'example'?: string;
      'word'?: string;
    }

    export interface ImrLanguageCardAttributes extends HTMLAttributes {
      'alt'?: string;
      'imgPath'?: string;
      'name'?: string;
    }

    export interface ImrLanguageListAttributes extends HTMLAttributes {

    }

    export interface ImrViewMainAttributes extends HTMLAttributes {

    }

    export interface ImrViewSettingsAttributes extends HTMLAttributes {

    }

    export interface ImrViewWordListAttributes extends HTMLAttributes {

    }

    export interface ImrWordItemAttributes extends HTMLAttributes {
      'ignoreWhiteSpace'?: boolean;
      'insensitive'?: boolean;
      'singular'?: boolean;
      'translation'?: string;
      'type'?: string;
      'value'?: string;
    }
  }

  interface HTMLElementTagNameMap {
    'imr-app-header': HTMLImrAppHeaderElement
    'app-icon': HTMLAppIconElement
    'imr-app-root': HTMLImrAppRootElement
    'imr-input': HTMLImrInputElement
    'imr-language-card': HTMLImrLanguageCardElement
    'imr-language-list': HTMLImrLanguageListElement
    'imr-view-main': HTMLImrViewMainElement
    'imr-view-settings': HTMLImrViewSettingsElement
    'imr-view-word-list': HTMLImrViewWordListElement
    'imr-word-item': HTMLImrWordItemElement
  }

  interface ElementTagNameMap {
    'imr-app-header': HTMLImrAppHeaderElement;
    'app-icon': HTMLAppIconElement;
    'imr-app-root': HTMLImrAppRootElement;
    'imr-input': HTMLImrInputElement;
    'imr-language-card': HTMLImrLanguageCardElement;
    'imr-language-list': HTMLImrLanguageListElement;
    'imr-view-main': HTMLImrViewMainElement;
    'imr-view-settings': HTMLImrViewSettingsElement;
    'imr-view-word-list': HTMLImrViewWordListElement;
    'imr-word-item': HTMLImrWordItemElement;
  }
}
declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;