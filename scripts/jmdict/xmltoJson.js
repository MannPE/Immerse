var convert = require('xml-js');
var fs = require('fs');
var xml = fs.readFileSync('./kanjidic2.xml', 'utf8');

var result = convert.xml2json(xml, {compact: true, spaces: 4});

fs.writeFile('./kanjidic2.json', result, err => {
    if(err)
        console.log("Error Writing File", err);
    else
        console.log('Successfully wrote file');
});
