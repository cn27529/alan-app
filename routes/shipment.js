//var models = require('../models');
var express = require("express");
var router = express.Router();
var cool = require("cool-ascii-faces");

var logpath = "./routes/shipment";
var logger = require("../logConfig").logger(logpath, "debug");

// //請求路由時，會經過它
// router.use(function(req,res,next){
//     //console.log('---------------'+ req.originalUrl);
//     //logger.info('---------------'+ req.originalUrl);
//     next();
// });

router.get("/", function(req, res) {
    var title = req.originalUrl + "";
    logger.info(title);

    res.render("shipment", {
        title: title,
        cool: cool(),
        // items: [1991, 'byvoid', 'express', 'Node.js']
        layout: "_tocas-layout"
    });
});

router.get("/list", function(req, res) {
    var title = req.originalUrl + "";
    //logger.info(title);
    //var path_array = req.originalUrl.split('/');

    res.render("shipment-list", {
        title: title,
        cool: cool(),
        // items: [1991, 'byvoid', 'express', 'Node.js']
        layout: "_tocas-layout"
    });
});

router.get("/new", function(req, res) {
    var title = req.originalUrl + "";
    logger.info(title);
    //var path_array = req.originalUrl.split('/');

    res.render("shipment-new", {
        title: title,
        cool: cool(),
        // items: [1991, 'byvoid', 'express', 'Node.js']
        layout: "_tocas-layout"
    });
});

module.exports = router;