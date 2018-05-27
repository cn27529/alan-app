var fs = require('fs')
var request = require('request')
    //https://github.com/Keyang/node-csvtojson
var csvtojson = require('csvtojson')

var url_html = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTu1l2t6AOj8rFzwJ1WHxUYT34YmMuYvKeGmf3IjfuTGRGpuJqV0O-m69ckg5XGvZA9rOSwejOnYER4/pubhtml';
var url_csv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTu1l2t6AOj8rFzwJ1WHxUYT34YmMuYvKeGmf3IjfuTGRGpuJqV0O-m69ckg5XGvZA9rOSwejOnYER4/pub?output=csv';

function write_file(file_name, data) {

    fs.writeFile(file_name, data, function(err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });

}

function res_sheet_data(error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    //return;

    var obj = [];
    var csvStr = body;

    var file_name = 'test-csv.txt';
    write_file(file_name, csvStr)

    console.log('res_sheet_data end')

}

var url_split = url_csv.split('/')
var sheet_url = url_csv;
//console.log(url_split)
request(sheet_url, res_sheet_data)