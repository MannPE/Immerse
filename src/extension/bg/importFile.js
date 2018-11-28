var fileChooser = document.createElement("input");
fileChooser.type = 'file';
fileChooser.accept= '.csv';

console.log("choosing file");
fileChooser.addEventListener('change', function (evt) {
  var f = evt.target.files[0];
  if(f) {
    var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
        /* Handle your document contents here */
            console.log("These are the contents:\n",contents);
            var arr = contents.split('\n'); 
            var jsonObj = [];
            var headers = arr[0].split(',');
            for(var i = 1; i < arr.length; i++) {
                var data = arr[i].split(',');
                var obj = {};
                for(var j = 0; j < data.length; j++) {
                    obj[headers[j].trim()] = data[j].trim();
                }
                jsonObj.push(obj);
            }
            console.log(jsonObj);
            var wordList = jsonObj
            chrome.storage.sync.set({'imrkorean':wordList}), function(words){
                console.log(`Korean words have been set to`, wordList);
            }
        }
        reader.readAsText(f);
  }
});

document.body.appendChild(fileChooser);
fileChooser.click();
