// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

console.log("background loaded successfully");


chrome.runtime.onMessage.addListener(
  function(message, callback) {
    if (message == "changeColor"){
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="orange"'
      });
    }
 });

chrome.tabs.onCreated.addListener(function(){
  console.log("Tab created.");
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status == "complete"){
    console.log("Tab update complete", tab);
    updateTabText(tab);
  }
});




function updateTabText(tab){
  chrome.tabs.executeScript(tab.id,  {
    file:"src/bg/controller/updater.js"
    // ,
    // code: "console.log('this was injected');"
  },
  function(res){
    console.log("Update successful", res);
  }
)}



function sendResponse(){
  console.log("Hello from extension");
}
