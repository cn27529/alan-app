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

//文件 https://cn27529.gitbooks.io/alan-app-api/content/product.html

router.get('/', function (req, res) {

    var title = req.originalUrl + ' running now.';
    logger.info(title);

    var myFolder = './xlsx-import-files';
    var folderFiles = _FAFWork.getFolderFiles(myFolder);
    var returnFiles = _FAFWork.getReturnFiles(folderFiles, myFolder);
    console.log(returnFiles);

    res.render('vendor', {
        title: title,
        cool: cool(),
        data: returnFiles,
        layout: '_tocas-layout' //指定layout名可不需副名.ejs 
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

    models.supplier.findAll({
            // where: {
            //     tag: 'admin'
            // },
            //tableHint: TableHints.NOLOCK,
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['id', 'ASC']
            ]
        }).then(function (data) {

            //if (keyword != "Q_QtaiwanQvQ") data = cool(); console.log(data);
            json.data = data;
            json.code = _err.ALL.KEY;
            json.msg = _err.ALL.VAL;
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

    logger.info('/all');

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    };

    var title = 'vendor-list';
    var colnames = ['SId', 'SName','STel','SFax','SAddress'];
   
    models.supplier.findAll({
            // where: {
            //     tag: 'admin'
            // },
            //tableHint: TableHints.NOLOCK,
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['id', 'ASC']
            ]
        }).then(function (data) {

            //if (keyword != "Q_QtaiwanQvQ") data = cool(); console.log(data);
            json.data = data;
            json.code = _err.ALL.KEY;
            json.msg = _err.ALL.VAL;
            //res.json(json);

            res.render('vendor-list2', {
                title: title,
                cool: cool(),
                data: json.data,
                stringJson: JSON.stringify(json.data),
                cols: colnames,
                layout: '_tocas-layout' //指定layout名可不需副名.ejs 
            });

        })
        .catch(function (err) {

            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            //res.json(json);

        });



});

module.exports = router;