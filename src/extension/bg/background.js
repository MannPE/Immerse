  chrome.browserAction.onClicked.addListener(function (tab) {
    // for the current tab, inject the "inject.js" file & execute it
    runFile('extension/bg/tabAction.js',tab.id);
  });

    //load japanese dictionary if not already loaded
    chrome.storage.local.get(['imr-reference-jp'],function(result ){
      console.log("REFERENCE WORDS FOR JP ARE:",result);
      if(!!result)
      fetch(chrome.extension.getURL('assets/references/kanji_data.json'))
      .then((resp) => resp.json())
      .then(function (jsonData) {
          console.log(jsonData);
          chrome.storage.local.set({ 'imr-reference-jp': jsonData }, () => {
            console.log('tried loading kanji_data.json');
          });
      });
    });
  

  //If the url isnt blocked then run the tabAction on that tab.
  chrome.tabs.onUpdated.addListener(function (tabId , info) {
    if (info.status === 'complete') {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let currentDomain = extractHostname(tabs[0].url).toString();
        chrome.storage.sync.get(['imrdomains'], (result) => {
          let blockedDomains = result['imrdomains'] || {};
          if(!blockedDomains) {
            chrome.sync.set({'imrdomains': {}}, function() {
              console.log("Immerse created blocked domain list");
            });
          }
          if(!blockedDomains[currentDomain]) {
            console.log("Immerse will be run in", tabs[0].url)
            runFile('extension/bg/tabAction.js',tabId);
            runFile('extension/bg/tabAction.js',tabId);
          }else{
            console.log("Immerse will not run in",currentDomain);
          }
        });
      })
    }
  });

  //Check if there already exists an imrdomain list, if not then set it to docs.google.com
  chrome.storage.sync.get(['imrdomains'],function(result ){ 
    console.log("Found this as imrdomains:", result);
    if(result['imrdomains'] === null || (Object.keys(result['imrdomains']).length === 0 && result.constructor === Object)){
      var domains = 
      {
        "docs.google.com":true
      }
      chrome.storage.sync.set({'imrdomains':domains}), function(stuff){
        console.log(`sync words have been set to`, domains);
      }
    }
  });

  //Check if a wordlist already exists, if not then set it to thank you and yes words to be substituted
  chrome.storage.local.get(['imr-active-language'],function(result ){
    console.log("THE LANGUAGE WE LOAD WORDS FROM IS:",result);
    chrome.storage.local.get(['imrkorean'],function(result ){
      console.log("Loaded words from imrkorean:", result);
      if(Object.keys(result).length === 0 && result.constructor === Object){
        var wordList = 
              {
                "thank you":{value:"thank you", translation:"감사합니다 ", caseSensitive:false, ignoreWhiteSpace: false},
                "yes":{value:"yes", translation:"네", caseSensitive:false, ignoreWhiteSpace: false}
              }
        chrome.storage.local.set({'imrkorean':wordList}), function(words){
          console.log(`Korean words have been set to`, wordList);
        }
      }
    });
  });

  //Add items to the context menu
  chrome.contextMenus.create({
    title: "Add '%s' to immerse", 
    contexts:["selection"], 
    onclick: function(info, tab){
      console.log("CLICKED CONTEXT MENU",info, tab);
      chrome.tabs.create({ url: "https://translate.google.com/#auto/ko/"+info.selectionText });
    }
  });

  // //run all the good stuff when receiving a message.
  // chrome.runtime.onMessage.addListener(
  //   function(request, sender, sendResponse) {
  //     console.log(sender.tab ?
  //                 "from a content script:" + sender.tab.url :
  //                 "from the extension",request);
  //         runFile('extension/bg/tabAction.js',null);
  //   });

  function runFile(fileName, tabId){
    try{
      chrome.tabs.executeScript(tabId, {
        file: fileName
      }, null);
    }catch(e){
      console.log("Was not able to run immerse in this domain");
    }

  }


//ADDITIONAL HELPER FUNCTIONS

   function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

// To address those who want the "root domain," use this function:
 function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}
