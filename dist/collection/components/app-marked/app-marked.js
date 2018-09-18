export class AppMarked {
    componentWillLoad() {
        return this.fetchNewContent();
    }
    fetchNewContent() {
        if (this.doc !== undefined) {
            const doc = document;
            return fetch(`/docs-content/${this.doc}`)
                .then(response => response.text())
                .then(data => {
                this.content = data;
                const el = doc.createElement('div');
                el.innerHTML = data;
                const headerEl = el.querySelector('h1');
                doc.title = (headerEl && headerEl.textContent + ' - Stencil') || 'Stencil';
            });
        }
    }
    render() {
        return [
            h("div", { class: "measure-lg", innerHTML: this.content })
        ];
    }
    static get is() { return "app-marked"; }
    static get properties() { return {
        "content": {
            "state": true
        },
        "doc": {
            "type": String,
            "attr": "doc",
            "watchCallbacks": ["fetchNewContent"]
        }
    }; }
    static get style() { return "/**style-placeholder:app-marked:**/"; }
}
