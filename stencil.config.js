const sass = require('@stencil/sass');

exports.config = {
  plugins: [
    sass()
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js',
        globPatterns: [
          '**/*.{html,js,css,json,ico,png}'
        ]
      }
    },
    {
      type: 'docs',
      jsonFile: 'dist/documentation.json'
    }
  ],
  globalStyle: 'src/global/style.scss',
  copy: [
    { src: 'extension/' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
