//var models = require('../models');
var express = require('express');
var cool = require('cool-ascii-faces');
//var router = express.Router();
var router = require('../routes/router_use');

var logpath = './routes/index';
var logger = require('../logConfig').logger(logpath, 'debug');


router.get('/', function(req, res) {
  //call router_me middleware
  var title = req.originalUrl + '';
  logger.info('req.path=' + req.path);

  res.render('index', {
    title: title,
    cool: cool(),
    layout: '_tocas-layout'
  });
  //end
});

router.get('/new', function(req, res) {
  //call router_me middleware
  var title = req.originalUrl + '';
  
  res.render('index', {
    title: title,
    cool: cool(),
    layout: '_tocas-layout'
  });
  //end
});

// 將路由套用至應用程式
router.use('/', router);


module.exports = router;
