//http://oss.sheetjs.com/js-xlsx/
//https://scarletsky.github.io/2016/01/30/nodejs-process-excel/
//https://github.com/SheetJS/js-xlsx

var args = require('./args');
var filepath = require('./filepath');
var XLSX = require('xlsx');
var json_settings = require("../data/settings.json");

var arg_obj = new args(); //參數物件

if (!arg_obj.isok) {
    console.log(arg_obj.msg);
    return;
}

//args ok, do something
var myFilepath = json_settings.importpath + arg_obj.filename;
var fp_obj = new filepath(myFilepath);
//var fp_obj = new filepath(); fp_obj.setPath(myFilepath);
if (!fp_obj.isok) {
    console.log(fp_obj.msg);
    return;
}
//console.log(fp_obj);
//return;

var workbook = XLSX.readFile(myFilepath);
//console.log(workbook);

var ws_name = workbook.SheetNames[0];
//var address_of_cell = 'A1';
/* Get worksheet */
var ws = workbook.Sheets[ws_name];

/* Find desired cell */
//var desired_cell = ws[address_of_cell];

/* Get the value */
//var desired_value = (desired_cell ? desired_cell.v : undefined);

//console.log(ws);

//var mysheet = XLSX.utils.sheet_to_formulae(ws);
//var mysheet_items = XLSX.utils.sheet_to_json(ws, {header:0, raw:true});
var mysheet_items = XLSX.utils.sheet_to_json(ws, { header: 1 });
//var mysheet_items = XLSX.utils.sheet_to_csv(ws, {header:0, raw:true});
console.log(mysheet_items);
//console.log(JSON.stringify(mysheet_items[0]))
return;

var mysheet = {};
mysheet.name = ws_name;
mysheet.data = mysheet_items;

//console.log(mysheet);

mysheet_items.map(function (value, index) {
    var obj = value;
    //console.log(obj);
    if (obj.買受人名稱 !== undefined) {
        //console.log(obj);
    }

    if (obj.下單日期 !== undefined) {
        var d = new Date(obj.下單日期);
        //var d = Date.parse(obj.下單日期);
        //console.log(d);
        //var n = d.toString();
        var n = d.toISOString().slice(0,10).replace(/-/g,"/");
        obj.下單日期 = n;
        //console.log(n);
        //console.log(obj);
    }

    if (obj.收入日期 !== undefined) {
        var d = new Date(obj.收入日期);
        //var d = Date.parse(obj.下單日期);
        //console.log(d);
        //var n = d.toString();
        var n = d.toISOString().slice(0,10).replace(/-/g,"/");
        obj.收入日期 = n;
        //console.log(n);
        //console.log(obj);
    }

})

console.log(mysheet_items);

//var json_str = JSON.stringify(mysheet);
//console.log(json_str);

// var fs = require('fs');
// var stream = fs.createWriteStream("my_file.json");
// stream.once('open', function(fd) {
//   stream.write(JSON.stringify(mysheet));
//   //stream.write("My second row\n");
//   stream.end();
// });





