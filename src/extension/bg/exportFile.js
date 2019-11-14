console.log('saving file');
chrome.storage.local.get(['imrkorean'], result => {
  exportToCsv(arrayToCsvRows(Object.values(result['imrkorean'])));
});

function arrayToCsvRows(values) {
  const finalRows = [['', 'value', 'translation', 'caseSensitive', 'ignoreWhiteSpace']];
  console.log('values being saved:', values);
  values.forEach(imrWord => {
    finalRows.push([
      imrWord.value,
      imrWord.translation,
      imrWord.caseSensitive,
      imrWord.ignoreWhiteSpace,
    ]);
  });
  return finalRows;
}

function exportToCsv(rows) {
  let csvContent = 'data:text/csv;charset=utf-8';
  rows.forEach(rowArray => {
    const row = rowArray.join(',');
    csvContent += `${row}\r\n`;
  });
  csvContent = csvContent.slice(0, -2); // "12345.0"

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `imr-wl-${getTimeStamp()}.csv`);
  document.body.appendChild(link); // Required for FF
  link.click();
}

function getTimeStamp() {
  const currentdate = new Date();
  const datetime = `${currentdate.getFullYear()}-${currentdate.getMonth() +
    1}-${currentdate.getDate()}-${currentdate.getHours()}-${currentdate.getMinutes()}-${currentdate.getSeconds()}`;
  return datetime;
}
