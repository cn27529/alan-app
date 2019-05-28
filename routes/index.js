//var models = require('../models');
var express = require('express');
var cool = require('cool-ascii-faces');
var router = express.Router();

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

module.exports = router;
