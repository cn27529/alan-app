//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var logpath = './routes/index';
var logger = require('../logConfig').logger(logpath, 'debug');

//文件 https://cn27529.gitbooks.io/alan-app/content/

//請求路由時，會經過它
router.use(function(req, res, next) {
  //console.log('---------------'+ req.originalUrl);
  //logger.info('---------------'+ req.originalUrl);
  next();
});

router.get('/', function(req, res, next) {
  var title =
    req.originalUrl + ' page render for the ' + new Date().toTimeString();
  logger.info(title);

  var viewContent = {
    title: title,
    cool: cool(),
    layout: '_layout' //指定layout名可不需副名.ejs
  };
  res.render('view', viewContent);

  //next();
});

module.exports = router;
