//var models = require('../models');
var express = require('express');
//var router = express.Router();
var router = require('../routes/router_me');
var cool = require('cool-ascii-faces');

var logpath = './routes/home';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function(req, res) {
  //
  var title = req.originalUrl + '';
  //logger.info(title);

  res.render('home', {
    title: title,
    cool: cool(),
    // items: [1991, 'byvoid', 'express', 'Node.js']
    layout: '_tocas-layout'
  });

  //next();
});

module.exports = router;
