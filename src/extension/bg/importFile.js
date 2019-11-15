// eslint-disable-next-line no-var
var fileChooser = document.createElement('input');
const ACTIVE_LANGUAGE = 'imr-active-language';
fileChooser.type = 'file';
fileChooser.accept = '.csv';

// console.log('choosing file');
fileChooser.addEventListener('change', evt => {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const contents = e.target.result;
      // /* Handle your document contents here */
      // console.log('These are the contents:\n', contents);
      const arr = contents.split('\n');
      const jsonObj = [];
      const headers = arr[0].split(',');
      for (let i = 1; i < arr.length; i++) {
        const data = arr[i].split(',');
        const obj = {};
        for (let j = 0; j < data.length; j++) {
          obj[headers[j].trim()] = data[j].trim();
        }
        jsonObj.push(obj);
      }
      const wordList = jsonObj;
      orderArrayAlphabetically(wordList);
      chrome.storage.local.get(ACTIVE_LANGUAGE, res => {
        const lang = res[ACTIVE_LANGUAGE];
        let newImport = {};
        newImport[lang] = wordList;
        chrome.storage.local.set(newImport);
      });
    };
    reader.readAsText(file);
  }
});

document.body.appendChild(fileChooser);
fileChooser.click();

function orderArrayAlphabetically(objArray) {
  objArray.sort((a, b) => {
    const textA = a.value.toUpperCase();
    const textB = b.value.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
}
