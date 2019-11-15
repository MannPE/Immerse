export enum Language {
  KOREAN = 'imrkorean',
  JAPANESE = 'imrjapanese',
  CHINESE = 'imrchinese',
  GERMAN = 'imrgerman',
  FRENCH = 'imrfrench',
  SPANISH = 'imrspanish',
  CUSTOM = 'imrcustom',
}

export const LANGUAGE_LIST: {
  name: Language;
  standardName: string;
  imgPath: string;
  alt: string;
}[] = [
  {
    name: Language.KOREAN,
    standardName: '한국어',
    imgPath: '/assets/img/flags/korean.png',
    alt: 'Korean_KR',
  },
  {
    name: Language.JAPANESE,
    standardName: '日本語',
    imgPath: '/assets/img/flags/japanese.png',
    alt: 'Japan_JP',
  },
  {
    name: Language.GERMAN,
    standardName: 'Deutsch',
    imgPath: '/assets/img/flags/german.png',
    alt: 'German_DE',
  },
  {
    name: Language.FRENCH,
    standardName: 'Français',
    imgPath: '/assets/img/flags/french.png',
    alt: 'French_FR',
  },
  {
    name: Language.SPANISH,
    standardName: 'Español',
    imgPath: '/assets/img/flags/spanish.png',
    alt: 'Spanish_MX',
  },
];
