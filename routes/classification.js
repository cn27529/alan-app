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
var _FAFWork = new FAFWork();

var _err = require('../data/err');
var models = require('../models');

//文件 https://cn27529.gitbooks.io/alan-app-api/content/classification.html

router.get('/', function (req, res) {

    var title = req.originalUrl + ' running now.';
    logger.info(title);

    // var myFolder = './xlsx-import-files';
    // var folderFiles = _FAFWork.getFolderFiles(myFolder);
    // var returnFiles = _FAFWork.getReturnFiles(folderFiles, myFolder);
    //console.log(returnFiles);

    res.render('classification', {
        title: title,
        cool: cool(),
        data: [],
        layout: '_bs-layout' //指定layout名可不需副名.ejs 
    });

});

router.get('/all', function (req, res) {

    logger.info('/all');

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    };

    models.classification.findAll(
        {
            // where: {
            //     tag: 'admin'
            // },
            //tableHint: TableHints.NOLOCK,
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['CName', 'ASC']]
        }).then(function (data) {

            //if (keyword != "Q_QtaiwanQvQ") data = cool(); console.log(data);
            json.data = data;
            json.code = _err.ALL.KEY
            json.msg = _err.ALL.VAL
            res.json(json);

        })
        .catch(function (err) {

            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            res.json(json);

        });

});


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
    
    res.render('product-list', {
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





module.exports = router;