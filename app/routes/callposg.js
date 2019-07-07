var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var moment = require('moment');
var request = require('request');

var uuid = require('uuid/v4');

var _err = require('../data/err');

var PasswordWork = require('../works/PasswordWork')
var _pw = new PasswordWork()

var ConfigSettingWork = require('../works/ConfigSettingWork')
var _config = new ConfigSettingWork()

var CallposgWork = require('../works/CallposgWork')
var _callposg = new CallposgWork()

//文件 https://cn27529.gitbooks.io/alan-app/content/callposg.html

var logpath = './routes/callposg';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function (req, res) {

    // console.log(_pw.defaultPassword())
    // var qq2 = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')
    //console.log(qq2)
    //console.log('utc時間')

    var title = 'callposg-api running now.';
    logger.info(title);

    res.render('callposg', {
        title: title,
        cool: cool()
        // items: [1991, 'byvoid', 'express', 'Node.js']
    });

});

router.get('/getmember/:mobilphone', function (req, res) {

    logger.info('/getmember/:mobilphone');

    var mobilphone = req.params.mobilphone;
    //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;

    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    }

    _callposg.getmember(req.params.mobilphone, function (cb_data) {
        res.json(cb_data)
    })

    //res.json(req.params)

});

//6.單一會員歷史交易查詢
router.get('/getsells/:mobilphone/:begindate/:enddate', function (req, res) {

    logger.info('/getsells/:mobilphone/:begindate/:enddate');

    var mobilphone = req.params.mobilphone;
    var begindate = req.params.begindate;
    var enddate = req.params.enddate;
    //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;

    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    }

    var req_body = {
        MobilPhone: mobilphone,
        BeginDate: begindate,
        EndDate: enddate
    }

    //console.log(req_body)
    //return;

    _callposg.getsells(req_body, function (cb_data) {
        res.json(cb_data)
    })

    //res.json(req.params)

});

//create
router.post('/create', function (req, res) {

    logger.info('/create');

    //token檢查, 先不檢查 var token = req.body.token;

    // var memberid = req.body.memberid;
    // var mobilphone = req.body.mobilphone;
    // var membername = req.body.membername;
    // var telephone = req.body.telephone;
    // var sex = req.body.sex;
    // var birthday = req.body.birthday;
    // var address = req.body.address;
    // var exchangedatetime = req.body.exchangedatetime;
    // var tag = "member";
    // var aflag = req.body.aflag;

    //console.log(memberid);
    //console.log(email);
    //console.log(tag);

    var json = {
        msg: _err.UNADD.VAL,
        code: _err.UNADD.KEY,
        data: []
    }

    _callposg.create(req.body, function (cb_data) {
        res.json(cb_data)
    })

    //res.json(req.body)

});

//update
router.post('/update', function (req, res) {

    logger.info('/update');

    var mobilphone = req.body.mobilphone;
    var membername = req.body.membername;
    var telephone = req.body.telephone;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var address = req.body.address;
    var exchangedatetime = req.body.exchangedatetime;
    var begindate = req.body.begindate;
    var enddate = req.body.enddate;
    var aflag = req.body.aflag;
    var bonus = req.body.bonus;
    var email = req.body.email;

    //console.log(telephone+'-----------------')

    var json = {
        msg: _err.UNMOD.VAL,
        code: _err.UNMOD.KEY,
        data: []
    }

    //var utcNow = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')
    _callposg.update(req.body, function (cb_data) {
        res.json(cb_data)
    })

    //res.json(req.body)

});

module.exports = router;