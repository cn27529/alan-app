//var models = require('../models');
var express = require("express");
var router = express.Router();
var cool = require("cool-ascii-faces");

var logpath = "./routes/menu";
var logger = require("../logConfig").logger(logpath, "debug");

router.get("/", function(req, res, next) {
    //call router_me middleware
    var title = req.originalUrl + "";

    res.render("menu", {
        title: title,
        cool: cool(),
        dataString: "",
        layout: "_tocas-layout"
    });
    //end
});

module.exports = router;