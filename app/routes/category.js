var express = require("express");
var router = express.Router();
var cool = require("cool-ascii-faces");
var fs = require("fs");
var uuid = require("uuid/v4");
var path = require("path");

var logpath = "./routes/category";
var logger = require("../logConfig").logger(logpath, "debug");

var XLSX = require("xlsx");
var json_settings = require("../data/settings.json");
var a2j = require("../arraydata2json");
var filepath = require("../filepath");

var FAFWork = require("../works/FAFWork");
var _FAFWork = new FAFWork();

var _err = require("../data/err");
var models = require("../models");

//文件 https://cn27529.gitbooks.io/alan-app-api/content/category.html

router.get("/", function(req, res) {
    var title = req.originalUrl + "";
    logger.info(title);

    var myFolder = "./app/xlsx-import-files";
    var folderFiles = _FAFWork.getFolderFiles(myFolder);
    var returnFiles = _FAFWork.getReturnFiles(folderFiles, myFolder);
    //console.log(returnFiles);

    res.render("category", {
        title: title,
        cool: cool(),
        data: returnFiles,
        layout: "_tocas-layout" //指定layout名可不需副名.ejs
    });
});

router.get("/all", function(req, res) {
    logger.info("/all");

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    };

    models.Classification.findAll({
            // where: {
            //     tag: 'admin'
            // },
            //tableHint: TableHints.NOLOCK,
            include: [{
                model: models.Product
                    // where: {
                    //     year_birth: 1984
                    // }
            }],
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ["id", "ASC"]
            ]
        })
        .then(function(data) {
            json.data = data;
            json.code = _err.ALL.KEY;
            json.msg = _err.ALL.VAL;
            res.json(json);
        })
        .catch(function(err) {
            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            res.json(json);
        });
});

router.get("/list", function(req, res) {
    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    };

    //var title = '所有分類項';
    var title = req.originalUrl + "";
    var colnames = ["CId", "CName", "By Product Count"];

    models.Classification.findAll({
            // where: {
            //     tag: 'admin'
            // },
            //tableHint: TableHints.NOLOCK,
            include: [{
                model: models.Product
                    // where: {
                    //     year_birth: 1984
                    // }
            }],
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ["id", "ASC"]
            ]
        })
        .then(function(data) {
            json.data = data;
            json.code = _err.ALL.KEY;
            json.msg = _err.ALL.VAL;
            //res.json(json);

            res.render("category-list", {
                title: title,
                cool: cool(),
                data: json.data,
                stringJson: JSON.stringify(json.data),
                cols: colnames,
                layout: "_tocas-layout" //指定layout名可不需副名.ejs
            });
        })
        .catch(function(err) {
            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            //res.json(json);
        });
});

router.get("/info/:filename", function(req, res) {
    //var title = '/:filename running now.';
    var title = req.originalUrl + "";
    logger.info(title);

    var filename = req.param.filename;
    var content = "";

    res.render("vendorinfo", {
        title: title,
        cool: cool(),
        data: content
            //layout: "_layout"
    });
});

module.exports = router;