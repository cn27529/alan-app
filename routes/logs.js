var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var fs = require('fs');

var uuid = require('uuid/v4');
var path = require('path');

var logpath = './routes/logs';
var logger = require('../logConfig').logger(logpath, 'debug');

var FAFWork = require('../works/FAFWork');
var _FAFWork = new FAFWork();

//文件 https://cn27529.gitbooks.io/cycoholic-api/content/logs.html

router.get('/', function (req, res) {

    var title = 'logs-api running now.';
    logger.info(title);

    var myFolder = './logs/';
    var folderFiles = _FAFWork.getFolderFiles(myFolder);
    var returnFiles = _FAFWork.getReturnFiles(folderFiles, myFolder);
    //console.log(returnFiles)

    res.render('logs', {
        title: title,
        cool: cool(),
        data: returnFiles,
        layout: '_bs-layout' //指定layout名可不需副名.ejs 
    });

});

router.get('/:filename', function (req, res) {

    var title = '/:filename running now.';
    logger.info(title);

    var filename = req.param.filename;
    var content = '';

    res.render('logs', {
        title: title,
        cool: cool(),
        data: content,
        layout: '_bs-layout' //指定layout名可不需副名.ejs 
    });

});

module.exports = router;