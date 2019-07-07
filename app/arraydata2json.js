//csv-to-json.js
//https://gist.github.com/iwek/7154578

module.exports = function arraydata2json(array_data) {

    var lines = array_data;
    var result = [];
    var headers = lines[0];
    //console.log(headers.length)
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        //console.log(lines[i])
        var currentline = lines[i];
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON

};