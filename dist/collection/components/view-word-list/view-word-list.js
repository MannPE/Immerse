export class ViewWordList {
    constructor() {
        this.words = [
            {
                "value": "cat",
                "translation": "Katze",
                "lang": "en",
                "type": "noun",
                "singular": true
            },
            {
                "value": "dog",
                "translation": "Hund",
                "lang": "en",
                "type": "noun",
                "singular": true
            }
        ];
    }
    render() {
        return (h("div", null, this.words.map(word => (h("imr-word-item", { value: word.value, translation: word.translation, lang: word.lang, type: word.type, singular: word.singular })))));
    }
    static get is() { return "imr-view-word-list"; }
    static get style() { return "/**style-placeholder:imr-view-word-list:**/"; }
}
