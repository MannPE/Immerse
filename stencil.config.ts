import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [
    sass()
  ],
  buildEs5: false,
  namespace: 'Immerse',
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'http://localhost:3333/',
      serviceWorker: {
        swSrc: 'src/sw.js',
        globPatterns: [
          '**/*.{html,js,css,json,ico,png}'
        ]
      }
    },
    {
      type: 'docs-json',
      file: 'dist/documentation.json'
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

export const devServer = {
  root: 'www',
  watchGlob: '**/**'
};
