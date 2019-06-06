//https://github.com/Keyang/node-csvtojson
//var request = require('request')
//var csvtojson = require('csvtojson')
var arraydata2json = require('./arraydata2json');
//var fs = require('fs')

var obj = [];
var csvStr = body;

var json = arraydata2json(obj);
console.log(json);
