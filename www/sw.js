importScripts('workbox-v3.3.1/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

self.workbox.precaching.precacheAndRoute([
  {
    "url": "assets/icon/favicon.ico",
    "revision": "99fc5f75faf5ed2c4f7b53d0034401a8"
  },
  {
    "url": "assets/img/feature-icons.png",
    "revision": "71a2d41278528e9657bb2946f68bc8c4"
  },
  {
    "url": "assets/img/flags/french.png",
    "revision": "c22730ced1fa73184a4aeaa307e12482"
  },
  {
    "url": "assets/img/flags/german.png",
    "revision": "fea064348a656df66951410006f9b19a"
  },
  {
    "url": "assets/img/flags/korean.png",
    "revision": "638bc39786750755f0178180369dcd98"
  },
  {
    "url": "assets/img/flags/spanish.png",
    "revision": "04baff48125166699397029ba78becce"
  },
  {
    "url": "assets/img/icon.png",
    "revision": "b96ad6e1e0b755c8cd45e6aec40bca25"
  },
  {
    "url": "assets/img/ionic-os-logo.png",
    "revision": "49c50777c91ace1a5a88b05ac3fe36ea"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "0ab79243b610b5eb6f909727799fe1df"
  },
  {
    "url": "assets/img/pwa-lighthouse-score.png",
    "revision": "4e251264bf1a48074b7447d950561ed7"
  },
  {
    "url": "assets/img/pwa-lighthouse-score@2x.png",
    "revision": "8834eab93cca7f54e08cf0d34d705070"
  },
  {
    "url": "assets/img/pwa-toolkit-logo.png",
    "revision": "2b3ef8ca43cd81579d7f82c75dc56a13"
  },
  {
    "url": "assets/img/pwa-toolkit-logo@2x.png",
    "revision": "042ab1061b56783d5afbad05a7573220"
  },
  {
    "url": "assets/img/pwa.png",
    "revision": "f740988d2e33bdfd48c816fa17ba9f00"
  },
  {
    "url": "assets/img/text-logo.png",
    "revision": "45a94a6c3509dac4b3b16415f2679896"
  },
  {
    "url": "assets/img/video-icon.png",
    "revision": "6f27af15cab04aafd7193b76825c2eac"
  },
  {
    "url": "build/app.css",
    "revision": "d17c073b3262697d70ae206831480df9"
  },
  {
    "url": "build/app.js",
    "revision": "3c1b1e8315a0e64a21922b1b878a455b"
  },
  {
    "url": "build/app/0lepnclc.es5.js",
    "revision": "99aa3f0d16dadce2f67db67fcd2a3df7"
  },
  {
    "url": "build/app/0lepnclc.js",
    "revision": "d0b78f9dc2c2344f350ad21599227614"
  },
  {
    "url": "build/app/7b0vbfzd.es5.js",
    "revision": "4822bacbcf779c789c21a2742899782d"
  },
  {
    "url": "build/app/7b0vbfzd.js",
    "revision": "edbd156c56430df10cf1204982c74642"
  },
  {
    "url": "build/app/app.tbvjghmf.js",
    "revision": "4c1bc9807985e26c7c3e7d7bc5bd2116"
  },
  {
    "url": "build/app/app.vwnlfls8.js",
    "revision": "5563657cbb3cadd8097497ab733a11c5"
  },
  {
    "url": "build/app/byict7vk.es5.js",
    "revision": "99d5084d605d47a3ee8c89eb05b1d007"
  },
  {
    "url": "build/app/byict7vk.js",
    "revision": "fdbc8872ded593e5b235362edef95813"
  },
  {
    "url": "build/app/chunk-0844f48d.js",
    "revision": "82ebe5b346c1b80e736df0c170a9b6c0"
  },
  {
    "url": "build/app/chunk-2cf4fa8a.es5.js",
    "revision": "d38cc1821e0c194ef7796c6b7b2b614b"
  },
  {
    "url": "build/app/dk3yl607.es5.js",
    "revision": "3252d1288da326c5a864f2c59c571148"
  },
  {
    "url": "build/app/dk3yl607.js",
    "revision": "764dd82fad3b228b45da5c845e8a7ecf"
  },
  {
    "url": "build/app/eemrtqfw.es5.js",
    "revision": "424eee68aa5430f4b4a8175eb9fa2b68"
  },
  {
    "url": "build/app/eemrtqfw.js",
    "revision": "784f8c4534055a0300ba17a0e339f42a"
  },
  {
    "url": "build/app/hvfxhyzg.es5.js",
    "revision": "e69a920178d820494a6c91a47d117070"
  },
  {
    "url": "build/app/hvfxhyzg.js",
    "revision": "1ef171858ce012df3e1e2ae21ee8ff3f"
  },
  {
    "url": "build/app/lg1vsmyg.es5.js",
    "revision": "7ebd8f9cb10e63a725967850be6d77fd"
  },
  {
    "url": "build/app/lg1vsmyg.js",
    "revision": "2e0d55b0cc86895113d05c4db7d31dc0"
  },
  {
    "url": "build/app/oeszzpwc.es5.js",
    "revision": "b124108724abd7a697d5af77d5078c19"
  },
  {
    "url": "build/app/oeszzpwc.js",
    "revision": "a3e7accf33f00b7036c33e7b94ed6083"
  },
  {
    "url": "build/app/sgqpehnv.es5.js",
    "revision": "bdd90e54cc3fe597095ad99d8b6c2307"
  },
  {
    "url": "build/app/sgqpehnv.js",
    "revision": "486a8f7879d5c17dc2145d82eea5aeae"
  },
  {
    "url": "build/app/zxkyfyba.es5.js",
    "revision": "a8c7e31dd247b19e56efc0d1a930fcc8"
  },
  {
    "url": "build/app/zxkyfyba.js",
    "revision": "6719187d805a544547c626e6edc3483f"
  },
  {
    "url": "docs/routing/index.html",
    "revision": "ce93120004d33d804bccf6d43bf4c19a"
  },
  {
    "url": "docs/service-workers/index.html",
    "revision": "792f4ad34178cabe75e9c4b376add511"
  },
  {
    "url": "extension/bg/background.html",
    "revision": "3b38f3fdac23f01ffdfbd260b68c79bb"
  },
  {
    "url": "extension/bg/background.js",
    "revision": "0cce1a794fc98c65c6e46836af828842"
  },
  {
    "url": "extension/bg/findAndReplaceDOMText.js",
    "revision": "1f84e472c8b1a9d18bf253248e0ef6ba"
  },
  {
    "url": "extension/bg/popper.js",
    "revision": "1fcb6222fd1e82eb9554f7517eb66bac"
  },
  {
    "url": "extension/bg/tabAction.js",
    "revision": "4015c1deddb1c2758411ad9cea1a1483"
  },
  {
    "url": "extension/bg/tooltip.css",
    "revision": "e75e20a7ee74ad31a9d9a7ebc6884944"
  },
  {
    "url": "extension/inject/inject.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "extension/inject/inject.js",
    "revision": "d703a3e2a186df39c5d82191d176a0e1"
  },
  {
    "url": "extension/popup.js",
    "revision": "5e5e3b1a4f77c1e8f09b3feac9e1732d"
  },
  {
    "url": "index.html",
    "revision": "658f4dc1c5be6ff1918ad765a792c473"
  },
  {
    "url": "manifest.json",
    "revision": "b78a8fb986fd0dffe487d2dca8de2943"
  },
  {
    "url": "settings/index.html",
    "revision": "891e2b2b04f7b02f654c217f067525ac"
  },
  {
    "url": "words/index.html",
    "revision": "891a90b73c6e9b56da74c74ed5693942"
  }
]);