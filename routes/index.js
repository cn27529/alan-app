//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var logpath = './routes/index';
var logger = require('../logConfig').logger(logpath, 'debug');

//文件 https://cn27529.gitbooks.io/cycoholic-api/content/

router.get('/', function (req, res) {

    var title = 'index-api running now.';
    logger.info(title);

    res.render('index', {
        title: title,
        cool: cool()
        // items: [1991, 'byvoid', 'express', 'Node.js']
        //layout: "layout"
    });

});


module.exports = router;