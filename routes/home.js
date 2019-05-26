//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var logpath = './routes/index';
var logger = require('../logConfig').logger(logpath, 'debug');

//文件 https://cn27529.gitbooks.io/cycoholic-api/content/

//請求路由時，會經過它
router.use(function(req,res,next){
    //console.log('---------------'+ req.originalUrl);
    //logger.info('---------------'+ req.originalUrl);
    next();
});

router.get('/', function (req, res) {

    var title = req.originalUrl + '';
    logger.info(title);

    res.render('home', {
        title: title,
        cool: cool(),
        // items: [1991, 'byvoid', 'express', 'Node.js']
        layout: "_tocas-layout"
    });

    //next();

});


module.exports = router;