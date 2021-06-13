import browser from 'webextension-polyfill';
import { Language } from './languages';

const DEFAULT_LANGUAGE: Language | null = null; // When null the extension was just installed or opened
const LOCAL_STORAGE_LANGUAGE: string = 'imr-active-language';

export class LangManager {
  private static __instance: LangManager;
  private _activeLanguage: Language = DEFAULT_LANGUAGE;
  private _subscribers: Function[] = [];

  private updateLanguage(lang: Language) {
    this._activeLanguage = lang;
    this._subscribers.forEach(f => f(this._activeLanguage));
  }

  static get instance(): LangManager {
    if (!LangManager.__instance) {
      LangManager.__instance = new LangManager();
      this.__instance.getSavedLanguage();
    }
    return LangManager.__instance;
  }

  onLanguageChanged(subscriber: (lang: Language) => void) {
    this._subscribers.push(subscriber);
  }

  async changeActiveLanguage(lang: Language): Promise<void> {
    try {
      await browser.storage.local.set({ [LOCAL_STORAGE_LANGUAGE]: lang });
      console.log('[changeActiveLanguage] => ', lang);
      this.updateLanguage(lang);
    } catch (e) {
      console.log('[changeActiveLanguage] ERROR', e);
    }
  }

  getActiveLanguage(): Language {
    return this._activeLanguage;
  }

  private async getSavedLanguage(): Promise<void> {
    const result = await browser.storage.local.get(LOCAL_STORAGE_LANGUAGE);
    console.log('[getSavedLanguage] =>', result);
    let localLanguage: Language = result[LOCAL_STORAGE_LANGUAGE];
    if (localLanguage) {
      this.changeActiveLanguage(localLanguage);
    }
  }
}
