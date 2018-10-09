/*! Built with http://stenciljs.com */
const { h } = window.App;

class NotFoundPage {
    render() {
        return (h("div", null,
            h("h1", null, "Uh oh! We can't find the page your looking for."),
            h("p", null,
                h("stencil-route-link", { url: '/', class: 'block' }, "Head back to the home page"))));
    }
    static get is() { return "notfound-page"; }
    static get style() { return "notfound-page {\n  text-align: center; }"; }
}

export { NotFoundPage as NotfoundPage };
