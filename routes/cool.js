//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var _err = require('../data/err');


var logpath = './routes/cool';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function (req, res) {

    var title = 'cool-api running now.';
    //logger.info(title);

    var json = {
        msg: _err.OK.VAL,
        code: _err.OK.KEY,
        data: []
    }

    var cools = [];

    try {

        for (var i = 0; i < 100; i++) {
            cools.push(cool());
        }
        json.data = cools;

    } catch (err) {
        logger.error(err);
    }

    res.json(json);
    //logger.info(json);

    // res.render('cool', {
    //     title: 'cool-api',
    //     cool: cool(),
    //     cools: cools
    //         // items: [1991, 'byvoid', 'express', 'Node.js']
    // });

});

module.exports = router;