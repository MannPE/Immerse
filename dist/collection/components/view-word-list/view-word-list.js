export class ViewWordList {
    componentWillLoad() {
        console.log("Will load");
        chrome.storage.sync.get(['imrkorean'], (result) => {
            this.setWords(result['imrkorean']);
            console.log("words loaded into wordlist", this.words);
        });
    }
    loadWords() {
        console.log(this.words);
    }
    setWords(any) {
        this.words = any;
        console.log("setting words", any, this.words);
    }
    render() {
        console.log("rendered", this.words);
        if (this.words) {
            let wordItems = [];
            for (var key in this.words) {
                let word = this.words[key];
                console.log(word);
                wordItems.push(h("imr-word-item", { value: word.value, translation: word.translation, insensitive: word.insensitive, ignoreWhiteSpace: word.ignoreWhiteSpace }));
            }
            return wordItems;
        }
        else
            return h("div", null, "NO WORDS");
    }
    static get is() { return "imr-view-word-list"; }
    static get properties() { return {
        "_el": {
            "elementRef": true
        },
        "loadWords": {
            "method": true
        },
        "setWords": {
            "method": true
        },
        "words": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:imr-view-word-list:**/"; }
}
