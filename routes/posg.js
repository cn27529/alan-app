var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var moment = require('moment');
var request = require('request');

var uuid = require('uuid/v4');

var _err = require('../data/err');

var PasswordWork = require('../works/PasswordWork');
var _pw = new PasswordWork();

var ConfigSettingWork = require('../works/ConfigSettingWork');
var _config = new ConfigSettingWork();

var CallposgWork = require('../works/CallposgWork');
var _callposg = new CallposgWork();

var logpath = './routes/posg';
var logger = require('../logConfig').logger(logpath, 'debug');

//文件 https://cn27529.gitbooks.io/alan-app/content/posg.html

router.get('/', function(req, res) {
  //console.log(_pw.defaultPassword())

  var title = 'posg-api running now.';
  logger.info(title);

  res.render('posg', {
    title: title,
    cool: cool()
    // items: [1991, 'byvoid', 'express', 'Node.js']
  });
});

router.get('/getmember/:mobilphone', function(req, res) {
  logger.info('/getmember/:mobilphone');

  var mobilphone = req.params.mobilphone;
  //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;

  var json = {
    msg: _err.UN1.VAL,
    code: _err.UN1.KEY,
    data: []
  };

  //console.log(mobilphone.length)
  if (mobilphone.length !== 11) {
    json.code = _err.CHECKVAL.KEY;
    json.msg = _err.CHECKVAL.VAL;
    res.json(json);
    logger.info(json);
    return;
  }

  models.Member.findAll({
    where: {
      mobilphone: mobilphone
    }
  })
    .then(function(data) {
      data.map(function(item) {
        json.msg = _err.GET1.VAL;
        json.code = _err.GET1.KEY;
        json.data.push(item);
      });

      if (data != null) {
        _callposg.getmember(mobilphone, cb_getmember);
      }

      logger.info(json);
      res.json(json);
    })
    .catch(function(err) {
      console.log(err);
      json.code = _err.UNSQL.KEY;
      json.msg = err;
      logger.error(err);
      res.json(json);
    });
});

//6.單一會員歷史交易查詢
router.get('/getsells/:mobilphone/:begindate/:enddate', function(req, res) {
  logger.info('/getsells/:mobilphone/:begindate/:enddate');

  var mobilphone = req.params.mobilphone;
  var begindate = req.params.begindate;
  var enddate = req.params.enddate;
  //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;

  var json = {
    msg: _err.UN1.VAL,
    code: _err.UN1.KEY,
    data: []
  };

  var req_body = {
    MobilPhone: mobilphone,
    BeginDate: begindate,
    EndDate: enddate
  };

  //console.log(req_body)
  //return;

  _callposg.getsells(req_body, function(cb_data) {
    res.json(cb_data);
  });

  //res.json(req.params)
});

//create
router.post('/create', function(req, res) {
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
  var tag = 'member';
  var aflag = req.body.aflag;
  var email = req.body.email;

  //console.log(memberid);
  //console.log(email);
  //console.log(tag);

  var json = {
    msg: _err.UNADD.VAL,
    code: _err.UNADD.KEY,
    data: []
  };

  if (mobilphone.length !== 11) {
    json.code = _err.CHECKVAL.KEY;
    json.msg = _err.CHECKVAL.VAL;
    logger.info(json);
    res.json(json);

    return;
  }

  // if (memberid === null || memberid === '' || memberid === undefined) {
  //     json.code = _err.CHECKVAL.KEY;
  //     json.msg = _err.CHECKVAL.VAL;
  //     res.json(json);
  //     return;
  // }

  //假設nowDate日期時間為：2017-11-19 12:00(Asia/Taipei)
  var nowDate = new Date();
  var twNow = moment(nowDate)
    .tz('Asia/Taipei')
    .format('YYYY-MM-DD HH:mm:ss');
  var utcNow = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');
  var pwd = _pw.encode(_pw.defaultPassword());

  models.Member.findOrCreate({
    where: {
      //memberid: memberid,
      mobilphone: mobilphone
      //tag: tag
    },
    defaults: {
      memberid: memberid,
      mobilphone: mobilphone,
      telephone: telephone,
      membername: membername,
      tag: tag,
      sex: sex,
      birthday: birthday,
      address: address,
      exchangedatetime: twNow,
      utctime: utcNow,
      uuid: uuid(),
      pwd: pwd,
      aflag: aflag,
      email: email
    }
  })
    .spread(function(data, created) {
      console.log(data.get({ plain: true }));
      console.log('created=', created);

      if (created) {
        _callposg.create(data, cb_create);

        setTimeout(function() {
          _callposg.getmember(mobilphone, cb_getmember);
        }, 1000);
      }

      logger.info('created=' + created);

      json.msg = _err.ADD.VAL;
      json.code = _err.ADD.KEY;
      json.data.push(data);
      logger.info(json);
      res.json(json);
    })
    .catch(function(err) {
      console.log(err);
      json.code = _err.UNADD.KEY;
      json.msg = _err.UNADD.VAL + ' ' + err;
      logger.error(err);
      res.json(json);
    });
});

//update
router.post('/update', function(req, res) {
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
  };

  var utcNow = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');

  models.Member.find({
    where: {
      mobilphone: mobilphone
      //tag: 'member'
    }
  })
    .then(function(data) {
      if (data != null) {
        var localtime = new Date(data.exchangedatetime);
        var srctime = new Date(exchangedatetime);

        // console.log('localtime')
        // console.log(localtime.toISOString())
        // console.log('srctime')
        // console.log(srctime.toISOString())

        if (
          membername === '' ||
          membername === null ||
          membername === undefined
        )
          membername = data.membername;
        if (telephone === '' || telephone === null || telephone === undefined)
          telephone = data.telephone;
        if (sex === '' || sex === null || sex === undefined) sex = data.sex;
        if (birthday === '' || birthday === null || birthday === undefined)
          birthday = data.birthday;
        if (address === '' || address === null || address === undefined)
          address = data.address;
        if (begindate === '' || begindate === null || begindate === undefined)
          begindate = data.begindate;
        if (enddate === '' || enddate === null || enddate === undefined)
          begindate = data.enddate;
        if (aflag === '' || aflag === null || aflag === undefined)
          aflag = data.aflag;
        if (bonus === '' || bonus === null || bonus === undefined)
          bonus = data.bonus;
        if (email === '' || email === null || email === undefined)
          email = data.email;

        if (srctime > localtime) {
          console.log(
            'srctime > localtime-----------------------------------------------------'
          );
          logger.info(
            'srctime > localtime-----------------------------------------------------'
          );
          logger.info('req.body');
          logger.info(req.body);

          data
            .update({
              //mobilphone: mobilphone,
              membername: membername,
              telephone: telephone,
              sex: sex,
              birthday: birthday,
              address: address,
              exchangedatetime: exchangedatetime,
              utctime: utcNow,
              begindate: begindate,
              enddate: enddate,
              aflag: aflag,
              bonus: bonus,
              email: email
            })
            .then(function() {});

          //console.log(data);
          json.msg = _err.MOD.VAL;
          json.code = _err.MOD.KEY;
          json.data.push(data);
        } else if (localtime > srctime) {
          console.log(
            'localtime > srctime-----------------------------------------------------'
          );
          logger.info(
            'localtime > srctime-----------------------------------------------------'
          );

          json.msg = _err.MOD.VAL;
          json.code = _err.MOD.KEY;
          json.data.push(data);
          //res.json(json);

          _callposg.update(data, cb_update);
          //console.log('_callposg.update')
          setTimeout(function() {
            _callposg.getmember(mobilphone, cb_getmember);
          }, 1000);
        }
      } else {
        json.msg = _err.UN1.VAL;
        json.code = _err.UN1.KEY;
      }

      res.json(json);
      //logger.info(json);
    })
    .catch(function(err) {
      console.log(err);
      json.code = _err.UNSQL.KEY;
      json.msg = err;
      logger.error(err);
      res.json(json);
    });
});

//del
router.post('/del', function(req, res) {
  logger.info('/del');

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
  };

  var utcNow = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');

  models.Member.find({
    where: {
      mobilphone: mobilphone
      //tag: 'member'
    }
  })
    .then(function(data) {
      if (data != null) {
        var localtime = new Date(data.exchangedatetime);
        var srctime = new Date(exchangedatetime);

        // console.log('localtime')
        // console.log(localtime.toISOString())
        // console.log('srctime')
        // console.log(srctime.toISOString())

        if (
          membername === '' ||
          membername === null ||
          membername === undefined
        )
          membername = data.membername;
        if (telephone === '' || telephone === null || telephone === undefined)
          telephone = data.telephone;
        if (sex === '' || sex === null || sex === undefined) sex = data.sex;
        if (birthday === '' || birthday === null || birthday === undefined)
          birthday = data.birthday;
        if (address === '' || address === null || address === undefined)
          address = data.address;
        if (begindate === '' || begindate === null || begindate === undefined)
          begindate = data.begindate;
        if (enddate === '' || enddate === null || enddate === undefined)
          begindate = data.enddate;
        if (aflag === '' || aflag === null || aflag === undefined)
          aflag = data.aflag;
        if (bonus === '' || bonus === null || bonus === undefined)
          bonus = data.bonus;
        if (email === '' || email === null || email === undefined)
          email = data.email;

        //aflag 啟用否 O Int(1) -1:停用 0:啟用(預設)
        aflag = -1;

        if (srctime > localtime) {
          console.log(
            'srctime > localtime-----------------------------------------------------'
          );
          logger.info(
            'srctime > localtime-----------------------------------------------------'
          );
          logger.info('req.body');
          logger.info(req.body);

          data
            .update({
              //mobilphone: mobilphone,
              // membername: membername,
              // telephone: telephone,
              // sex: sex,
              // birthday: birthday,
              // address: address,
              exchangedatetime: exchangedatetime,
              utctime: utcNow,
              //begindate: begindate,
              //enddate: enddate,
              aflag: aflag,
              //bonus: bonus,
              email: email
            })
            .then(function() {});

          //console.log(data);
          json.msg = _err.MOD.VAL;
          json.code = _err.MOD.KEY;
          json.data.push(data);
        } else if (localtime > srctime) {
          console.log(
            'localtime > srctime-----------------------------------------------------'
          );
          logger.info(
            'localtime > srctime-----------------------------------------------------'
          );

          json.msg = _err.MOD.VAL;
          json.code = _err.MOD.KEY;
          json.data.push(data);
          //res.json(json);

          _callposg.update(data, cb_update);
          //console.log('_callposg.update')
          setTimeout(function() {
            _callposg.getmember(mobilphone, cb_getmember);
          }, 1000);
        }
      } else {
        json.msg = _err.UN1.VAL;
        json.code = _err.UN1.KEY;
      }

      res.json(json);
      //logger.info(json);
    })
    .catch(function(err) {
      console.log(err);
      json.code = _err.UNSQL.KEY;
      json.msg = err;
      res.json(json);
      logger.error(err);
    });
});

router.get('/all', function(req, res) {
  logger.info('/all');

  var keyword = req.params.keyword;
  //var token = req.params.token; //先不檢查
  var json = {
    msg: _err.UN1.VAL,
    code: _err.UN1.KEY,
    data: []
  };

  models.Member.findAll({
    where: {
      tag: 'member'
    },
    //tableHint: TableHints.NOLOCK,
    order: [
      // Will escape username and validate DESC against a list of valid direction parameters
      ['id', 'DESC']
    ]
  })
    .then(function(data) {
      json.data = data;
      json.code = _err.ALL.KEY;
      json.msg = _err.ALL.VAL;
      res.json(json);
    })
    .catch(function(err) {
      console.log(err);
      json.code = _err.UNSQL.KEY;
      json.msg = err;
      res.json(json);
      logger.error(err);
    });
});

//对于get请求的?xxxx=,使用req.query.xxxxx方法
//模擬posgapi
router.get('/callposg-getmember?', function(req, res) {
  logger.info('/callposg-getmember?');

  var mobilphone = req.query.MobilPhone;
  //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;

  var json = {
    msg: _err.UN1.VAL,
    code: _err.UN1.KEY,
    data: []
  };

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
  })
    .then(function(data) {
      data.map(function(item) {
        json.msg = _err.GET1.VAL;
        json.code = _err.GET1.KEY;
        json.data.push(item);
      });

      if (data != null) {
      }

      res.json(json);
      logger.info(json);
    })
    .catch(function(err) {
      console.log(err);
      json.code = _err.UNSQL.KEY;
      json.msg = err;
      res.json(json);
      logger.error(err);
    });
});

//模擬posgapi
router.post('/callposg-create', function(req, res) {
  logger.info('/callposg-create');

  //res.send(cool());
  logger.info('------imitation call posg create api------');
  console.log(req.body);
  //console.log(cool());
  console.log('utc時間');
  var time = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');
  console.log(time);
});

//模擬posgapi
router.post('/callposg-update', function(req, res) {
  logger.info('/callposg-update');

  //res.send(cool());
  logger.info('------imitation call posg update api------');
  console.log(req.body);
  //console.log(cool());
  console.log('utc時間');
  var time = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');
  console.log(time);
});

//模擬posgapi
router.post('/callposg-del', function(req, res) {
  logger.info('/callposg-del');

  //res.send(cool());
  logger.info('------imitation call posg del api------');
  console.log(req.body);
  //console.log(cool());
  console.log('utc時間');
  var time = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');
  console.log(time);
});

//模擬posgapi
router.get('/callposg-getsells?', function(req, res) {
  logger.info('/callposg-getsells?');

  var mobilphone = req.params.mobilphone;
  var begindate = req.params.begindate;
  var enddate = req.params.enddate;
  //var token = req.params.token; //先不檢查 console.log(_err.add.key); return;

  var json = {
    msg: _err.UN1.VAL,
    code: _err.UN1.KEY,
    data: []
  };

  var req_body = {
    MobilPhone: mobilphone,
    BeginDate: begindate,
    EndDate: enddate
  };

  json.data.push(req_body);
  logger.info(json);

  // _callposg.getsells(req_body, function (cb_data) {
  //     res.json(cb_data)
  // })

  res.json(json);
});

function cb_update(data1) {
  var qq = 'posg.js call cb_update';
  console.log(qq);

  logger.info(qq);
  logger.info(data1);
}

function cb_getmember(data1) {
  var qq = 'posg.js call cb_getmember';
  console.log(qq);

  logger.info(qq);
  logger.info(data1);
}

function cb_create(data1) {
  var qq = 'posg.js call cb_create';
  console.log(qq);

  logger.info(qq);
  logger.info(data1);
}

module.exports = router;
