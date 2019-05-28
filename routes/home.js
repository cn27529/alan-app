//var models = require('../models');
var express = require('express');
var cool = require('cool-ascii-faces');
var router = express.Router();

var logpath = './routes/home';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function(req, res, next) {
  //
  var title = req.originalUrl + '';
  logger.info('req.path=' + req.path);

  res.render('home', {
    title: title,
    cool: cool(),
    // items: [1991, 'byvoid', 'express', 'Node.js']
    layout: '_tocas-layout'
  });

  //next();
});

module.exports = router;
