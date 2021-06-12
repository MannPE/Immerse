const fs = require('fs');

const entryFile = 'dist/index.html';
const newScriptFile = 'onLoadScript.js';

try {
  let textContents = fs.readFileSync(entryFile, 'utf8');
  const scriptTagStart = textContents.lastIndexOf('<script');
  const scriptTagEnd = textContents.indexOf('</body>');
  let script = '';
  if (scriptTagStart > 0 && scriptTagEnd > 0) {
    script = textContents.substring(scriptTagStart, scriptTagEnd);
    const newFilContents = script.substring(script.indexOf('>') + 1, script.lastIndexOf('<'));
    fs.writeFileSync(`dist/${newScriptFile}`, newFilContents);
    textContents = textContents.replace(script, `<script src="${newScriptFile}"></script>`);
    fs.writeFileSync(entryFile, textContents, 'utf-8');
  }
} catch (err) {
  console.log('PostInstall ERROR: ', err);
}
