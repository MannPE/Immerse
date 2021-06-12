import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  plugins: [sass()],
  buildEs5: false,
  namespace: 'Immerse',
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'http://localhost:3333/',
      serviceWorker: {
        swSrc: 'src/sw.js',
        globPatterns: ['**/*.{html,js,css,json,ico,png}'],
      },
      dir: './dist',
    },
    {
      type: 'docs-json',
      file: 'dist/documentation.json',
    },
  ],
  globalStyle: 'src/global/style.scss',
  copy: [{ src: 'extension/' }, { src: 'browser-polyfill.min.js' }],
};

export const devServer = {
  root: 'www',
  watchGlob: '**/**',
};
