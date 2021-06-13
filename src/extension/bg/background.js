/* eslint-disable prefer-destructuring */
// console.log('"BACKGROUND: The current active language is ');
const BLOCKED_DOMAINS = 'imrdomains';
const ACTIVE_LANGUAGE = 'imr-active-language';
const languageCodes = {
  imrjapanese: 'jp',
  imrkorean: 'kr',
  imrgerman: 'de',
  imrfrench: 'fr',
  imrspanish: 'es',
};
let immerseActive = false;
chrome.tabs.onUpdated.addListener((tab, changeInfo) => {
  console.log('[Immerse] onUpdated tab', tab);
  if (!immerseActive && changeInfo.status && changeInfo.status === 'complete') {
    chrome.storage.local.get([ACTIVE_LANGUAGE], res => {
      console.log('Active lang:', res);
      if (res && !!res[ACTIVE_LANGUAGE]) {
        immerseActive = true;
        console.log('Current Language:', res);
        // Need to have a language selected for all these functions to actually work
        createInitialWordListIfNotExist();
        createContextMenus();
        runImmerseOnTabUpdated();
      } else {
        console.log(
          'No language has been selected yet, open the extension and select an initial language for immerse to start working'
        );
      }
    });
  }
});

loadDomainBlackList();
loadReferenceDictionary();

function createInitialWordListIfNotExist() {
  chrome.storage.local.get([ACTIVE_LANGUAGE], lang => {
    const activeLanguage = lang[ACTIVE_LANGUAGE];
    console.log('First results', activeLanguage);
    chrome.storage.local.get([activeLanguage], words => {
      // Check if a wordlist already exists, if not then add the default wordlist
      console.log('Loaded words from:', lang, words);
      if (words.constructor === Object && Object.keys(words).length === 0) {
        console.log();
        fetch(
          chrome.extension.getURL(`assets/initialWordList/${languageCodes[activeLanguage]}.json`)
        )
          .then(resp => resp.json())
          .then(wordDict => {
            console.log('initialData:', wordDict);
            const initialData = {};
            initialData[activeLanguage] = wordDict;
            chrome.storage.local.set(initialData, err =>
              console.log('Loaded initial wordList', initialData, err, activeLanguage)
            );
          })
          .catch(err => {
            console.log('Error loading initial Word Lsit', err);
          });
      }
    });
    // TODO MOVE ALL ACTIVELANGUAGE DEPENDANT CODE IN HERE
  });
}

// // load language dictionary if not already loaded
function loadReferenceDictionary() {
  // TODO look for dictionaries and choose when to load each one
  chrome.storage.local.get(['imr-reference-jp'], result => {
    console.log('[loadReferenceDictionary] => ', result);
    if (!result)
      fetch(chrome.extension.getURL('assets/dictionaries/kanji_data.json'))
        .then(resp => resp.json())
        .then(jsonData => {
          // console.log(jsonData);
          chrome.storage.local.set({ 'imr-reference-jp': jsonData }, () => {
            // console.log('tried loading kanji_data.json');
          });
        });
  });
}

// If the url isnt blocked then run the tabAction on that tab.
function runImmerseOnTabUpdated() {
  console.log('adding listener to immerse');
  chrome.tabs.onUpdated.addListener((tabId, info) => {
    if (info.status && info.status === 'complete') {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentDomain = extractHostname(tabs[0].url).toString();
        chrome.storage.sync.get([BLOCKED_DOMAINS], result => {
          const blockedDomains = result[BLOCKED_DOMAINS] || {};
          if (!blockedDomains) {
            chrome.sync.set({ imrdomains: {} }, () => {
              console.log('Immerse created blocked domain list');
            });
          }
          if (!blockedDomains[currentDomain]) {
            createInitialWordListIfNotExist();
            console.log('Immerse will be run in', tabs[0].url);
            runFile('extension/bg/tabAction.js', tabId);
          } else {
            console.log('Immerse will not run in', currentDomain);
          }
        });
      });
    }
  });
}

// Check if there already exists an imrdomain list, if not then set it to docs.google.com
function loadDomainBlackList() {
  chrome.storage.sync.get([BLOCKED_DOMAINS], result => {
    console.log('Current blocked domains:', result);
    const domainDict = result[BLOCKED_DOMAINS];
    if (!domainDict || Object.keys(domainDict).length === 0) {
      const domains = {
        'docs.google.com': true,
        'console.aws.amazon.com': true,
      };
      chrome.storage.sync.set({ imrdomains: domains });
    }
  });
}

// Add items to the context menu
function createContextMenus() {
  chrome.contextMenus.create({
    // TODO look for providers on eah language
    title: "Add '%s' to immerse",
    contexts: ['selection'],
    onclick: (info, tab) => {
      console.log('CLICKED CONTEXT MENU', info, tab);
      chrome.tabs.create({
        url: `https://translate.google.com/#auto/ko/${info.selectionText}`,
      });
    },
  });
}

function runFile(fileName, tabId) {
  try {
    chrome.tabs.executeScript(
      tabId,
      {
        file: fileName,
      },
      null
    );
  } catch (e) {
    console.log('Was not able to run immerse in this domain');
  }
}

// ADDITIONAL HELPER FUNCTIONS

function extractHostname(url) {
  let hostname;
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  // find & remove port number
  hostname = hostname.split(':')[0];
  // find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}
