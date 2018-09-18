export class NotFoundPage {
    render() {
        return (h("div", null,
            h("h1", null, "Uh oh! We can't find the page your looking for."),
            h("p", null,
                h("stencil-route-link", { url: '/', class: 'block' }, "Head back to the home page"))));
    }
    static get is() { return "notfound-page"; }
    static get style() { return "/**style-placeholder:notfound-page:**/"; }
}