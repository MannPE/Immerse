chrome.tabs.getCurrent((res) => {
  console.log("Blocking domain:",res);
  // chrome.storage.local.get(['imrDomaina'],function(result){
  //   let oldItems = result;
  //   oldItems[res] = res;
  //   console.log();
  // });
});
