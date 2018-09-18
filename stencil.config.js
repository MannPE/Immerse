const sass = require('@stencil/sass');

exports.config = {
  plugins: [
    sass()
  ],
  buildEs5: true,
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
    },
    {
      type: 'dist',
      dir: './dist'
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
