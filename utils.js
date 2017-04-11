function loadJSONReport(path, callback) {
    var request = new XMLHttpRequest();
    request.overrideMimeType('application/json')
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var report = JSON.parse(request.responseText);
            callback(report);
        }
    };
    request.open('GET', path, true)
    request.send(null);
}

function reportObjectBubbleSort(arr){
   var len = arr.length;
   for (var i = len-1; i>=0; i--) {
     for (var j = 1; j<=i; j++) {
       if (arr[j-1].lines > arr[j].lines) {
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}

function shortenFileName(longFileName) {
    var simplifiedName = longFileName.split(commonFilePathToOmit);
    return simplifiedName && simplifiedName[1];
}

function cleanupFilePath(result) {
    if (!commonFilePathToOmit) {
        return;
    }

    for (var i = 0; i < result.length; i++) {
        result[i].firstFile.name = shortenFileName(result[i].firstFile.name);
        result[i].secondFile.name = shortenFileName(result[i].secondFile.name);
    }

    return result;
}
