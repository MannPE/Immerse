const fs = require('fs');
var allKanjiData = require('./kanji_data.json')
let hashedKanjiData = {};
console.log(allKanjiData.length);

(allKanjiData).forEach(element => {
    hashedKanjiData[element.kanji] = element;
});

const hashedKanjiJson = JSON.stringify(hashedKanjiData);
fs.writeFile('./hashed_kanji_data.json', hashedKanjiJson, err => {
    if(err)
        console.log("Error Writing File", err);
    else
        console.log('Successfully wrote file');
});
