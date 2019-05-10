import { Language } from "./languages";

const DEFAULT_LANGUAGE: Language = Language.KOREAN;
const LOCAL_STORAGE_LANGUAGE: string = "imr-active-language"; 

export class LangManager {
    private static __instance: LangManager;
    private _activeLanguage: Language = DEFAULT_LANGUAGE;

    static get instance(): LangManager {
        if (!LangManager.__instance) {
            LangManager.__instance = new LangManager();
            this.__instance.getSavedLanguage();
        }
        return LangManager.__instance;
    }
    
    changeActiveLanguage(lang: Language): void {
        chrome.storage.local.set({ [LOCAL_STORAGE_LANGUAGE]: lang }, function() {
        });
    }

    getActiveLanguage(): Language {
        return this._activeLanguage;
    }

    private getSavedLanguage() {
        chrome.storage.local.get([LOCAL_STORAGE_LANGUAGE], (result) => {
            let res = result[LOCAL_STORAGE_LANGUAGE];
            if(!res) {
                this.changeActiveLanguage(this._activeLanguage);
            }
            this._activeLanguage =  res;
        });
    };

}