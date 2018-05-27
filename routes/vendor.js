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

    var mysheet_json = XLSX.utils.sheet_to_json(ws, {header: 0});
    //csv_items = mysheet_items.split('\n');
    //console.log(mysheet_items);
    //logger.info(csv_items);

    var vendor = JSON.parse(a2j(mysheet_items));
    //console.log(vendor);
    //logger.info(vendor);

    var colnames = mysheet_items[0];
    //console.log(colnames);
    
    res.render('vendorlist', {
        title: title,
        cool: cool(),
        data: vendor,
        vendor: vendor,
        colnames: colnames,
        vendorps: []
        //layout: "layout"

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
        //layout: "layout"
    });

});

router.get('/', function (req, res) {

    var title = req.originalUrl + ' running now.';
    logger.info(title);

    var myFolder = './xlsx-import-files';
    var folderFiles = [];
    folderFiles = getFolderFiles(myFolder);
    var returnFiles = [];
    returnFiles = getReturnFiles(folderFiles, myFolder);
    //console.log(returnFiles)

    res.render('vendor', {
        title: title,
        cool: cool(),
        data: returnFiles
        //layout: "layout"
    });

});

function getFolderFiles(myFolder) {

    var folderFiles = [];

    fs.readdirSync(myFolder).forEach(function (val) {

        //console.log(index, val);
        var path_a = myFolder; // other 是一個目錄
        var path_b = val; // other.txt 是一個存於 other 目錄裡的檔案
        var path_resolve = path.resolve(path_a, path_b); // 解析成絕對路徑
        //console.info(path_resolve);
        // 輸出內容：/Users/carlos/Documents/test/other/other.txt
        var extname = path.extname(path_resolve);
        //console.info(path.extname(path_resolve));

        //排除不要的副名
        if (extname.toLowerCase() === '.md') return false;
        folderFiles.push(val);
    });

    //logger.info(folderFiles)
    return folderFiles;
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

function getReturnFiles(folderFiles, myFolder) {

    var returnFiles = [];

    folderFiles.forEach(function (val, index, array) {

        //console.log(index, val);
        var path_a = myFolder; // other 是一個目錄
        var path_b = val; // other.txt 是一個存於 other 目錄裡的檔案
        var path_resolve = path.resolve(path_a, path_b); // 解析成絕對路徑
        //console.info(path_resolve);
        // 輸出內容：/Users/carlos/Documents/test/other/other.txt
        var extname = path.extname(path_resolve);

        var fileSizeInBytes = getFilesizeInBytes(path_resolve);

        //console.log(file);
        var myInfo = {
            mb: ((fileSizeInBytes / 1024) / 1024).toFixed(2),
            kb: (fileSizeInBytes / 1024).toFixed(2),
            bytes: fileSizeInBytes,
            fullpatn: path_resolve,
            extname: extname,
            name: val,
            id: uuid()
        };
        returnFiles.push(myInfo)

    });

    //logger.info(returnFiles);

    return returnFiles;

}

module.exports = router;