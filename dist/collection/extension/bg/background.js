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
          runFile('extension/bg/tabAction.js',null);
    });


  function runFile(fileName, tabId){
    console.log("tab was fully loaded, tab");
    chrome.tabs.executeScript({
      file: fileName
    }, function(response){
      if(response){
        console.log("there was a response", response);
      }
    });
  }

