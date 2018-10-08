export class ViewWordList {
    constructor() {
        this.words = [
            {
                value: "cat",
                translation: "Katze",
                lang: "de",
                type: "noun",
                singular: true
            },
            {
                value: "dog",
                translation: "Hund",
                lang: "de",
                type: "noun",
                singular: true
            },
            {
                value: "dog",
                translation: "Hund",
                lang: "de",
                type: "noun",
                singular: true
            },
            {
                value: "jump",
                translation: "도역",
                lang: "kr",
                type: "verb",
                singular: true
            }
        ];
    }
    render() {
        return [
            this.words.map(word => (h("imr-word-item", { value: word.value, translation: word.translation, lang: word.lang, type: word.type, singular: word.singular })))
        ];
    }
    static get is() { return "imr-view-word-list"; }
    static get style() { return "/**style-placeholder:imr-view-word-list:**/"; }
}
