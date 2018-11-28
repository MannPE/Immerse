console.log("saving file");
chrome.storage.sync.get(['imrkorean'],function(result ){
    exportToCsv(arrayToCsvRows(Object.values(result['imrkorean'])));
  });


  function arrayToCsvRows(values) {
    let finalRows = [["","value", "translation", "caseSensitive", "ignoreWhiteSpace"]];
    values.forEach(imrWord => {
      finalRows.push([imrWord.value, imrWord.translation, imrWord.caseSensitive, imrWord.ignoreWhiteSpace]);
    });
    return finalRows;
  }

  function exportToCsv(rows) {
    let csvContent = "data:text/csv;charset=utf-8";
    rows.forEach(function(rowArray){
       let row = rowArray.join(",");
       csvContent += row + "\r\n";
    }); 
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `imr-wl-${getTimeStamp()}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
}


function getTimeStamp(){
  var currentdate = new Date(); 
  var datetime = ""+currentdate.getFullYear() 
                + (currentdate.getMonth()+1) 
                + currentdate.getDate()   
                + currentdate.getHours() 
                + currentdate.getMinutes() 
                + currentdate.getSeconds();
  return datetime;
}