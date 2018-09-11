/*! Built with http://stenciljs.com */
const { h } = window.App;

class LazyIframe {
    componentDidLoad() {
        if ('IntersectionObserver' in window) {
            this.io = new IntersectionObserver((data) => {
                if (data[0].isIntersecting) {
                    this.handleIframe();
                    this.cleanup();
                }
            });
            this.io.observe(this.el.querySelector('iframe'));
        }
        else {
            this.handleIframe();
        }
    }
    componentDidUnload() {
        this.cleanup();
    }
    handleIframe() {
        this.realSrc = this.src;
    }
    cleanup() {
        // always make sure we remove the intersection
        // observer when its served its purpose so we dont
        // eat cpu cycles unnecessarily
        if (this.io) {
            this.io.disconnect();
            this.io = null;
        }
    }
    render() {
        return (h("div", null,
            h("iframe", { frameBorder: "0", title: this.name, allowFullScreen: true, src: this.realSrc, frameborder: this.frameBorder, scrolling: this.scrolling, width: this.width, height: this.height })));
    }
    static get is() { return "lazy-iframe"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "frameBorder": {
            "type": String,
            "attr": "frame-border"
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "realSrc": {
            "state": true
        },
        "scrolling": {
            "type": String,
            "attr": "scrolling"
        },
        "src": {
            "type": String,
            "attr": "src"
        },
        "width": {
            "type": String,
            "attr": "width"
        }
    }; }
    static get style() { return "lazy-iframe iframe .github-stargazers {\n  border: 1px solid red;\n  float: right; }"; }
}

export { LazyIframe };
