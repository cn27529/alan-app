//https://github.com/Keyang/node-csvtojson
var request = require('request');
var csvtojson = require('csvtojson');
var arraydata2json = require('./arraydata2json');
var fs = require('fs');

var url_html =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTu1l2t6AOj8rFzwJ1WHxUYT34YmMuYvKeGmf3IjfuTGRGpuJqV0O-m69ckg5XGvZA9rOSwejOnYER4/pubhtml';
var url_csv =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTu1l2t6AOj8rFzwJ1WHxUYT34YmMuYvKeGmf3IjfuTGRGpuJqV0O-m69ckg5XGvZA9rOSwejOnYER4/pub?output=csv';

function write_file(file_name, data) {
  fs.writeFile(file_name, data, function(err) {
    if (err) console.log(err);
    else console.log('Write operation complete.');
  });
}

function res_sheet_data(error, response, body) {
  //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  //return;

  var obj = [];
  var csvStr = body;

  csvtojson({ noheader: true })
    .fromString(csvStr)
    .on('csv', (csvRow, rowIndex) => {
      // this func will be called 3 times
      //console.log(csvRow) // => [1,2,3] , [4,5,6]  , [7,8,9]
      obj[rowIndex] = csvRow;
    })
    .on('done', () => {
      //parsing finished
      //console.log(obj[14])
      var json = arraydata2json(obj);

      var file_name = 'test-json.txt';
      write_file(file_name, json);

      console.log(json);
    });
}

var url_split = url_csv.split('/');
var sheet_url = url_csv;
//console.log(url_split)
request(sheet_url, res_sheet_data);

// /** csv file
//     a,b,c
//     1,2,3
//     4,5,6
//     */

// let csvFilePath = '<path to csv file>'
// csvFilePath = url_csv;
// const csv = require('csvtojson')
// csv()
//     .fromFile(csvFilePath)
//     .on('json', (jsonObj) => {
//         // combine csv header row and csv line to a json object
//         // jsonObj.a ==> 1 or 4
//         console.log(jsonObj)
//     })
//     .on('done', (error) => {
//         console.log('end')
//     })
