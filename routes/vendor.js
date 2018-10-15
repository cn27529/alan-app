var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var fs = require('fs');
var uuid = require('uuid/v4');
var path = require('path');

var logpath = './routes/vendor';
var logger = require('../logConfig').logger(logpath, 'debug');

var XLSX = require('xlsx');
var json_settings = require("../data/settings.json");
var a2j = require('../arraydata2json');
var filepath = require('../filepath');

var FAFWork = require('../works/FAFWork');

//文件 https://cn27529.gitbooks.io/cycoholic-api/content/logs.html


router.get('/list', function (req, res) {

    var title = req.originalUrl + ' running now.';
    //logger.info(title);

    //args ok, do something
    var myFilepath = json_settings.importpath + 'db.xlsx';
    var fp_obj = new filepath(myFilepath);
    if (!fp_obj.isok) {
        console.log(fp_obj.msg);
        return;
    }

    var workbook = XLSX.readFile(myFilepath);
    var first_sheet_name = workbook.SheetNames[0];
    var ws = workbook.Sheets[first_sheet_name];
    //var mysheet_items = XLSX.utils.sheet_to_csv(ws, { header: 0 });
    var mysheet_items = XLSX.utils.sheet_to_json(ws, {header: 1});

    //var mysheet_json = XLSX.utils.sheet_to_json(ws, {header: 0});
    //csv_items = mysheet_items.split('\n');
    //console.log(mysheet_items);
    //logger.info(csv_items);

    var data = JSON.parse(a2j(mysheet_items));
    //console.log(data);
    //logger.info(vendor);

    var colnames = mysheet_items[0];
    //console.log(colnames);
    
    res.render('vendor-list', {
        title: title,
        cool: cool(),
        data: data,
        cols: colnames,
        layout: '_bs-layout' //指定layout名可不需副名.ejs 
    });

});

router.get('/info/:filename', function (req, res) {

    var title = '/:filename running now.';
    logger.info(title);

    var filename = req.param.filename;
    var content = '';

    res.render('vendorinfo', {
        title: title,
        cool: cool(),
        data: content
        //layout: "_layout"
    });

});

router.get('/', function (req, res) {

    var title = req.originalUrl + ' running now.';
    logger.info(title);

    var myFolder = './xlsx-import-files';
    var folderFiles = FAFWork.getFolderFiles(myFolder);
    var returnFiles = FAFWork.getReturnFiles(folderFiles, myFolder);
    //console.log(returnFiles)

    res.render('vendor', {
        title: title,
        cool: cool(),
        data: returnFiles,
        layout: "_layout"
    });

});

module.exports = router;