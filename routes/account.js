var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var moment = require('moment');

var _sendMail = require('../mail/sendMail');
var _err = require('../data/err');

var PasswordWork = require('../works/PasswordWork')
var _pw = new PasswordWork()

var ConfigSettingWork = require('../works/ConfigSettingWork')
var _config = new ConfigSettingWork()

var CallposgWork = require('../works/CallposgWork')
var _callposg = new CallposgWork()

var moment = require('moment');
var validator = require('validator');

//文件 https://cn27529.gitbooks.io/cycoholic-api/content/account.html

var logpath = './routes/account';
var logger = require('../logConfig').logger(logpath, 'debug');

router.get('/', function (req, res) {

    var title = 'account-api running now.';
    logger.info(title);

    res.render('account', {
        title: title,
        cool: cool()
        // items: [1991, 'byvoid', 'express', 'Node.js']
    });
    //console.log('cool', cool())

});

router.post('/login', function (req, res) {

    logger.info('/login');

    var mobilphone = req.body.account;
    var pwd = req.body.pwd;
    //var token = req.params.token; //先不檢查

    var json = {
        msg: _err.UNLOGINPWDOK.VAL,
        code: _err.UNLOGINPWDOK.KEY,
        data: []
    }

    if (mobilphone === null || mobilphone === '' || mobilphone === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '帳號資料' + _err.UNVAL.VAL;
        logger.info(json);
        res.json(json);

        return;
    }

    if (pwd === null || pwd === '' || pwd === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '密碼值' + _err.UNVAL.VAL;
        logger.info(json);
        res.json(json);

        return;
    }

    models.Member.findOne({
        where: {
            mobilphone: mobilphone,
            pwd: _pw.encode(pwd)
        }
    })
        .then(function (data) {

            //console.log(data);
            if (data != null) {

                json.msg = _err.LOGINPWDOK.VAL;
                json.code = _err.LOGINPWDOK.KEY;
                json.data.push(data.uuid);

            } else {

                json.msg = _err.UNLOGINPWDOK.VAL;
                json.code = _err.UNLOGINPWDOK.KEY;

            }

            //console.log('return json')
            logger.info(json);
            res.json(json);


        }).catch(function (err) {

            console.log(err);

            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            res.json(json);


        });

});

router.post('/logout', function (req, res) {

    logger.info('/logout');

    var mobilphone = req.body.account;
    var pwd = req.body.pwd;
    //var token = req.params.token; //先不檢查

    var json = {
        msg: _err.UNLOGOUT.VAL,
        code: _err.UNLOGOUT.KEY,
        data: []
    }

    if (mobilphone === null || mobilphone === '' || mobilphone === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '帳號資料' + _err.UNVAL.VAL;
        res.json(json);
        return;
    }

    if (pwd === null || pwd === '' || pwd === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '密碼值' + _err.UNVAL.VAL;
        res.json(json);
        return;
    }

    models.Member.findOne({
        where: {
            mobilphone: mobilphone,
            pwd: _pw.encode(pwd)
        }
    })
        .then(function (data) {

            //console.log(data);
            if (data != null) {

                json.msg = _err.LOGOUT.VAL;
                json.code = _err.LOGOUT.KEY;
                json.data.push(data.uuid);

            } else {

                json.msg = _err.UNLOGOUT.VAL;
                json.code = _err.UNLOGOUT.KEY;

            }

            console.log('return json')
            res.json(json);


        }).catch(function (err) {

            console.log(err);
            json.code = _err.UNSQL.KEY;
            json.msg = err;
            logger.error(err);
            res.json(json);

        });

});


//callback function
function cb_sendMail(mailMsg, subject, html, from, to) {

    var twNow = moment(new Date()).tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss')
    var yymmdd = moment(new Date()).tz("Asia/Taipei").format('YYYY-MM-DD')

    models.Maillog.create({

        title: subject,
        body: html,
        mailFrom: from,
        mailTo: to,
        //cc:"",
        //bcc: "",
        attach: '',
        data: JSON.stringify(mailMsg),
        msg: JSON.stringify(mailMsg),
        yymmdd: yymmdd,
        localtime: twNow

    }).then(function (data) {
        //console.log(data);
        console.log('be created models.Maillog');
    }).catch(function (err) {
        console.log(err);
    });

}

//忘記密碼
router.post('/lostpwd', function (req, res) {

    logger.info('/lostpwd');

    var mobilphone = req.body.account;
    var pwd = req.body.pwd;
    //var token = req.params.token; //先不檢查

    var json = {
        msg: _err.UNLOGOUT.VAL,
        code: _err.UNLOGOUT.KEY,
        data: []
    }

    if (mobilphone === null || mobilphone === '' || mobilphone === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '帳號' + _err.UNVAL.VAL;
        res.json(json);
        return;
    }

    if (pwd === null || pwd === '' || pwd === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '密碼值' + _err.UNVAL.VAL;
        res.json(json);
        return;
    }

    models.Member.findOne({
        where: {
            mobilphone: mobilphone,
            pwd: _pw.encode(pwd)
        }
    }).then(function (data) {

        //console.log(data);
        if (data != null) {

            json.msg = _err.GET1.VAL;
            json.code = _err.GET1.KEY;
            json.data.push(data.uuid);

            if (data.email === null || data.email === '' || data.email === undefined) {
                json.code = _err.NOEMAIL.KEY;
                json.msg = data.mobilphone + _err.NOEMAIL.VAL;
            }
            else {

                var name = data.membername;
                var mailto = data.email;
                var pwd = data.pwd;

                //寄送密碼到郵件信箱中
                var mail_data = {
                    name: name,
                    mailFrom: 'postmaster@cycoholic.com.tw',
                    mailTo: mailto,
                    title: '忘記密碼',
                    body: 'Dear ' + name + ',<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
                    pwd: _pw.decode(pwd),
                    attachments: []
                    // attachments: [{ 
                    //     //utf-8 string as an attachment
                    //     filename: 'README.md',
                    //     content: 'README.md'
                    // }]
                }

                mail_data.body = 'Dear ' + mail_data.name + ',<br>Thank you for contacting us<br>This is your password: ' + mail_data.pwd + '<br>For your account security, please change your passowrd later.';

                _sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, mail_data.attachments, cb_sendMail);

                json.code = _err.SENDLOSTPWD.KEY;
                json.msg = data.mobilphone + _err.SENDLOSTPWD.VAL;

            }

        } else {

            json.msg = _err.UN1.VAL;
            json.code = _err.UN1.KEY;

        }

        //console.log('return json')
        res.json(json);


    }).catch(function (err) {

        console.log(err);
        json.code = _err.UNSQL.KEY;
        json.msg = err;
        logger.error(err);
        res.json(json);

    });

});



//重新指定密碼
router.post('/renewpwd', function (req, res) {

    logger.info('/renewpwd');

    var mobilphone = req.body.account;
    var pwd = req.body.pwd;
    var newpwd = req.body.newpwd;
    var againpwd = req.body.againpwd;
    //var token = req.params.token; //先不檢查

    var json = {
        msg: _err.UNLOGOUT.VAL,
        code: _err.UNLOGOUT.KEY,
        data: []
    }

    if (mobilphone === null || mobilphone === '' || mobilphone === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '帳號資料' + _err.UNVAL.VAL;
        res.json(json);
        return;
    }

    if (pwd === null || pwd === '' || pwd === undefined) {
        json.code = _err.UNVAL.KEY;
        json.msg = '密碼值' + _err.UNVAL.VAL;
        res.json(json);
        return;
    }

    if (newpwd !== againpwd) {
        json.code = _err.UNNEWPWD.KEY;
        json.msg = _err.UNNEWPWD.VAL;
        res.json(json);
        return;
    }

    models.Member.findOne({
        where: {
            mobilphone: mobilphone,
            pwd: _pw.encode(pwd)
        }
    }).then(function (data) {

        //console.log(data);
        if (data != null) {

            data.update({
                //mobilphone: mobilphone,
                pwd: _pw.encode(newpwd)
            }).then(function () {

            })

            json.msg = _err.RENEWPWD.VAL;
            json.code = _err.RENEWPWD.KEY;
            json.data.push(data.uuid);

        } else {

            json.msg = _err.UN1.VAL;
            json.code = _err.UN1.KEY;

        }

        //console.log('return json')
        res.json(json);


    }).catch(function (err) {

        console.log(err);
        json.code = _err.UNSQL.KEY;
        json.msg = err;
        logger.error(err);
        res.json(json);

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
        res.json(json);
        return;
    }

    models.Member.findAll({
        where: {
            mobilphone: mobilphone
        }
    }).then(function (data) {

        data.map(function (item) {
            json.msg = _err.GET1.VAL;
            json.code = _err.GET1.KEY;
            json.data.push(item.uuid);
        })
        res.json(json);

    }).catch(function (err) {

        console.log(err);
        json.code = _err.UNSQL.KEY;
        json.msg = err;
        logger.error(err);
        res.json(json);

    });

});

router.get('/email/:email', function (req, res) {

    logger.info('/email/:email');

    var email = req.params.email;
    //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;
    //console.log(!validator.isEmail(email))

    var json = {
        msg: _err.UN1.VAL,
        code: _err.UN1.KEY,
        data: []
    }

    //validator.isEmail('foo@bar.com'); //=> true
    //console.log(mobilphone.length)
    if (!validator.isEmail(email)) {
        json.code = _err.CHECKVAL.KEY;
        json.msg = _err.CHECKVAL.VAL;
        res.json(json);
        return;
    }

    models.Member.findAll({
        where: {
            email: email
        }
    }).then(function (data) {

        data.map(function (item) {
            json.msg = _err.GET1.VAL;
            json.code = _err.GET1.KEY;
            json.data.push(item.uuid);
        })
        res.json(json);

    }).catch(function (err) {

        console.log(err);
        json.code = _err.UNSQL.KEY;
        json.msg = err;
        logger.error(err);
        res.json(json);

    });

});

module.exports = router;
