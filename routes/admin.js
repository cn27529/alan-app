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

//文件 https://cn27529.gitbooks.io/cycoholic-api/content/admin.html

var logpath = './routes/admin';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function (req, res) {

    var title = 'admin-api running now.';
    logger.info(title);

    res.render('admin', {
        title: title,
        cool: cool()
        // items: [1991, 'byvoid', 'express', 'Node.js']
    });

});

router.get('/mobilphone/:mobilphone', function (req, res) {

    logger.info('/mobilphone/:mobilphone');

    var mobilphone = req.params.mobilphone;
    //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;

    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    }

    //console.log(mobilphone.length)
    if (mobilphone.length !== 11) {
        json.code = _err.CHECKVAL.KEY;
        json.msg = _err.CHECKVAL.VAL;
        logger.info(json);
        res.json(json);

        return;
    }

    models.Member
        .findAll({
            where: {
                mobilphone: mobilphone
            }
        }).then(function (data) {

            data.map(function (item) {
                json.msg = _err.GET1.VAL;
                json.code = _err.GET1.KEY;
                json.data.push(item);
            })
            logger.info(json);
            res.json(json);


        })
        .catch(function (err) {

            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            res.json(json);



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

    //console.log(mobilphone.length)
    if (mobilphone.length !== 11) {
        json.code = _err.CHECKVAL.KEY;
        json.msg = _err.CHECKVAL.VAL;
        logger.info(json);
        res.json(json);
        return;
    }

    models.Member
        .findAll({
            where: {
                mobilphone: mobilphone
            }
        }).then(function (data) {

            data.map(function (item) {
                json.msg = _err.GET1.VAL;
                json.code = _err.GET1.KEY;
                json.data.push(item);
            })
            res.json(json);

        })
        .catch(function (err) {

            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            res.json(json);


        });

});

//create
router.post('/create', function (req, res) {

    logger.info('/create');

    //token檢查, 先不檢查 var token = req.body.token;

    var memberid = req.body.memberid;
    var mobilphone = req.body.mobilphone;
    var membername = req.body.membername;
    var telephone = req.body.telephone;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var address = req.body.address;
    var exchangedatetime = req.body.exchangedatetime;
    var tag = "admin";
    var aflag = req.body.aflag;

    //console.log(memberid);
    //console.log(email);
    //console.log(tag);

    var json = {
        msg: _err.UNADD.VAL,
        code: _err.UNADD.KEY,
        data: []
    }

    if (mobilphone.length !== 11) {
        json.code = _err.CHECKVAL.KEY;
        json.msg = _err.CHECKVAL.VAL;
        res.json(json);
        return;
    }

    if (memberid === null || memberid === '' || memberid === undefined) {
        json.code = _err.CHECKVAL.KEY;
        json.msg = _err.CHECKVAL.VAL;
        res.json(json);
        return;
    }

    //假設nowDate日期時間為：2017-11-19 12:00(Asia/Taipei)
    var nowDate = new Date();
    var twNow = moment(nowDate).tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss')
    var utcNow = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')
    var pwd = _pw.encode(_pw.defaultPassword())

    models.Member
        .findOrCreate({
            where: {
                //memberid: memberid,
                mobilphone: mobilphone
                //tag: tag
            },
            defaults: {
                //memberid: memberid, //我們新增的沒有memberid
                mobilphone: mobilphone,
                //telephone: telephone,
                membername: membername,
                tag: tag,
                //sex: sex,
                //birthday: birthday,
                //address: address,
                exchangedatetime: twNow,
                utctime: utcNow,
                uuid: uuid(),
                pwd: pwd
            }
        })
        .spread(function (data, created) {

            console.log(data.get({ plain: true }))
            //console.log(JSON.stringify(data))
            console.log('created=', created)

            if (created) {

            }

            json.msg = _err.ADD.VAL;
            json.code = _err.ADD.KEY;
            json.data.push(data);
            logger.info(json);
            res.json(json);

        })
        .catch(function (err) {

            console.log(err);
            json.code = _err.UNADD.KEY;
            json.msg = _err.UNADD.VAL + ' ' + err;
            logger.error(err);
            res.json(json);

        });

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

    //console.log('email-----------------'+email)
    //return true;

    var json = {
        msg: _err.UNMOD.VAL,
        code: _err.UNMOD.KEY,
        data: []
    }

    var utcNow = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')

    models.Member.find({
        where: {
            mobilphone: mobilphone
            //tag: 'admin'
        }
    }).then(function (data) {

        if (data != null) {

            var localtime = new Date(data.exchangedatetime);
            var srctime = new Date(exchangedatetime);

            if (membername === '' || membername === null || membername === undefined) membername = data.membername;
            if (telephone === '' || telephone === null || telephone === undefined) telephone = data.telephone;
            if (sex === '' || sex === null || sex === undefined) sex = data.sex;
            if (birthday === '' || birthday === null || birthday === undefined) birthday = data.birthday;
            if (address === '' || address === null || address === undefined) address = data.address;
            if (begindate === '' || begindate === null || begindate === undefined) begindate = data.begindate;
            if (enddate === '' || enddate === null || enddate === undefined) begindate = data.enddate;
            if (aflag === '' || aflag === null || aflag === undefined) aflag = data.aflag;
            if (bonus === '' || bonus === null || bonus === undefined) bonus = data.bonus;
            if (email === '' || email === null || email === undefined) email = data.email;

            data.update({
                //mobilphone: mobilphone,
                membername: membername,
                //telephone: telephone,
                //sex: sex,
                //birthday: birthday,
                //address: address,
                exchangedatetime: exchangedatetime,
                utctime: utcNow,
                //begindate: begindate,
                //enddate: enddate,
                //aflag: aflag,
                //bonus: bonus,
                email: email
            }).then(function () {

            })

            //console.log(data);
            json.msg = _err.MOD.VAL;
            json.code = _err.MOD.KEY;
            json.data.push(data);



        } else {
            json.msg = _err.UN1.VAL;
            json.code = _err.UN1.KEY;
        }

        res.json(json);

    }).catch(function (err) {

        console.log(err);
        json.code = _err.UNSQL.KEY;
        json.msg = err;
        logger.error(err);
        res.json(json);

    });

});


//刪除資料
router.get('/del/:id', function (req, res) {

    logger.info('/del/:id');

    var id = req.params.id;

    var json = {
        id: id,
        msg: "沒有資料可刪除",
        err: ""
    }

    models.Member.findAll({
        where: {
            id: id
        }
    }).then(function (data) {

        data.map(function (item) {
            json.msg = "ok,刪除";

            models.Member.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function (data) {
                json.msg = "ok,刪除";
                json.id = data.id;
                res.json(json);
            });

        })
        res.json(json);

    }).catch(function (err) {

        console.log(err);
        json.err = "sql";
        json.msg = err;
        logger.error(err);
        res.json(json);

    });

});

//all的通關密語是Q_QtaiwanQvQ router.get('/all/:keyword', function(req, res) {
router.get('/all', function (req, res) {

    logger.info('/all');

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    }

    models.Member.findAll(
        {
            where: {
                tag: 'admin'
            },
            //tableHint: TableHints.NOLOCK,
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['id', 'DESC']]
        }).then(function (data) {

            //if (keyword != "Q_QtaiwanQvQ") data = cool(); console.log(data);
            json.data = data;
            json.code = _err.ALL.KEY
            json.msg = _err.ALL.VAL
            res.json(json);

        })
        .catch(function (err) {

            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            res.json(json);

        });

});


module.exports = router;