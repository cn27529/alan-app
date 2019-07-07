var cool = require('cool-ascii-faces');
var express = require('express');
var router = express.Router();

var logpath = './routes/random';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function (req, res, next) {

	var title = 'random-api running now.';
	logger.info(title);

	res.render('random', {
		title: title,
	});

});

module.exports = router;