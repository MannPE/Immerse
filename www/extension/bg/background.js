  chrome.browserAction.onClicked.addListener(function (tab) {
    // for the current tab, inject the "inject.js" file & execute it
    runFile('extension/bg/tabAction.js',tab.id);
  });


  chrome.tabs.onUpdated.addListener(function (tabId , info) {
    if (info.status === 'complete') {
      console.log("stuff is complete");
      runFile('extension/bg/tabAction.js',tabId);
    }
  });

  chrome.contextMenus.create({
    title: "Add '%s' to immerse", 
    contexts:["selection"], 
    onclick: function(info, tab){
      console.log("CLICKED CONTEXT MENU",info, tab);
      chrome.tabs.create({ url: "https://translate.google.com/#auto/ko/"+info.selectionText });
    }
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension",request);
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        for (const tab of tabs) {
          runFile('extension/bg/tabAction.js',tab.id);
        }
      });
    });


  function runFile(fileName, tabId){
    console.log("tab was fully loaded, tab");
    chrome.tabs.executeScript(tabId, {
      file: fileName
    }, function(response){
      if(response){
        console.log("there was a response", response);
      }
    });
  }

