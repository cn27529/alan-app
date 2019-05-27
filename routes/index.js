//var models = require('../models');
var express = require('express');
//var router = express.Router();
var cool = require('cool-ascii-faces');

var router = require('../routes/router_me');

var logpath = './routes/index';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function(req, res, next) {
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
