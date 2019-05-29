// https://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pa
// ttern.html

var models = require('../models');
var request = require('request');
var uuid = require('uuid/v4');
var moment = require('moment');

var ConfigSettingWork = require('./ConfigSettingWork');
var _config = new ConfigSettingWork();

var _sendMail = require('../mail/sendMail');

var logpath = './works/CallposgWork';
var logger = require('../logConfig').logger(logpath, 'debug');

//callback function
var cb_sendMail = function(mailMsg, subject, html, from, to) {
  logger.info('cb_sendMail');

  var twNow = moment(new Date())
    .tz('Asia/Taipei')
    .format('YYYY-MM-DD HH:mm:ss');
  var yymmdd = moment(new Date())
    .tz('Asia/Taipei')
    .format('YYYY-MM-DD');

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
  })
    .then(function(data) {
      //console.log(data);
      //console.log('be created models.Maillog');
      logger.info('be created models.Maillog');
    })
    .catch(function(err) {
      //console.log(err);
      logger.error(err);
    });
};

module.exports = function() {
  var CallposgWork = {
    hello: function() {
      console.log('hello CallposgWork');
    },

    getmember: function(data, callback) {
      var myJSONObject = data;
      var myURL = _config.posgURL().getmember + '?MobilPhone=' + myJSONObject;
      var error2mails = _config.posgURL().error2mails;

      logger.info(_config.env().env);
      //return;

      var options = {
        uri: myURL,
        method: 'GET',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
      };

      console.log(options);
      //logger.info(options);
      logger.info(options);
      //return;

      request(options, function(error, response, body) {
        //console.log(response.statusCode) console.log(response); console.log(body)
        if (error) {
          //console.log(body)
          //寄送密碼到郵件信箱中
          var mail_data = {
            mailFrom: 'postmaster@cycoholic.com.tw',
            mailTo: error2mails,
            title: '很遺憾的，POS機的服務GG了！通知',
            body: JSON.stringify(error) + '<br>' + JSON.stringify(options),
            attachments: []
          };

          //logger.info(mail_data);
          _sendMail(
            mail_data.mailFrom,
            mail_data.mailTo,
            mail_data.title,
            mail_data.body,
            mail_data.attachments,
            cb_sendMail
          );

          logger.error(error);
          //logger.error(error);
          //callback(body);
        } else {
          //return body;
          logger.info(body);
          callback(body);

          //console.log('-----------------------------------------------------------------------------');
          //console.log(JSON.parse(body));
          //console.log(body);
          //return;

          //console.log('CallposgWork.js call cb_getmember');
          var mybody = JSON.parse(body);

          models.Member.find({
            where: {
              mobilphone: mybody.mobilphone
            }
          })
            .then(function(data) {
              if (data != null) {
                console.log('GCP有資料');

                data
                  .update({
                    //mobilphone: mobilphone,
                    memberid: mybody.memberid
                  })
                  .then(function() {
                    console.log(
                      'memberid updated--------------------------------------------'
                    );
                    logger.info(
                      'memberid updated--------------------------------------------'
                    );
                  });
              } else {
                //json.msg = _err.UN1.VAL; json.code = _err.UN1.KEY;
                console.log('GCP沒資料');
              }
            })
            .catch(function(err) {
              console.log(err);
              logger.error(err);
            });
        }
      });
    },

    getsells: function(data, callback) {
      var myJSONObject = data;

      var myURL_pops = '?MobilPhone=' + myJSONObject.MobilPhone;
      myURL_pops += '&BeginDate=' + myJSONObject.BeginDate;
      myURL_pops += '&EndDate=' + myJSONObject.EndDate;
      var myURL = _config.posgURL().getsells + myURL_pops;
      var error2mails = _config.posgURL().error2mails;

      var options = {
        uri: myURL,
        method: 'GET',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
      };

      console.log(options);
      //logger.info(options)
      logger.info(options);

      request(options, function(error, response, body) {
        //console.log(response.statusCode) console.log(response); console.log(body)
        if (error) {
          //console.log(body)
          //寄送密碼到郵件信箱中
          var mail_data = {
            mailFrom: 'postmaster@cycoholic.com.tw',
            mailTo: error2mails,
            title: '很遺憾的，POS機的服務GG了！通知',
            body: JSON.stringify(error) + '<br>' + JSON.stringify(options),
            attachments: []
          };

          //logger.info(mail_data);
          _sendMail(
            mail_data.mailFrom,
            mail_data.mailTo,
            mail_data.title,
            mail_data.body,
            mail_data.attachments,
            cb_sendMail
          );

          logger.error(error);
          //logger.error(error);
          //callback(body);
        } else {
          logger.info(body);
          callback(body);

          console.log('CallposgWork.js call cb_getsells');
          var mybody = JSON.parse(body);

          models.Member.find({
            where: {
              mobilphone: mybody.result.mobilphone
            }
          })
            .then(function(data) {
              if (data != null) {
                console.log('GCP有資料');

                data
                  .update({
                    //mobilphone: mobilphone,
                    memberid: mybody.result.memberid
                  })
                  .then(function() {
                    console.log('memberid updated');
                    //logger.info('memberid updated');
                  });
              } else {
                //json.msg = _err.UN1.VAL; json.code = _err.UN1.KEY;
                console.log('GCP沒資料');
              }
            })
            .catch(function(err) {
              console.log(err);
              logger.error(err);
            });
        }
      });
    },

    update: function(data, callback) {
      var myJSONObject = data;
      var error2mails = _config.posgURL().error2mails;

      var options = {
        url: _config.posgURL().update,
        method: 'PUT',
        json: true, // <--Very important!!!
        body: myJSONObject
      };

      console.log(options);
      logger.info(options);

      request(options, function(error, response, body) {
        //console.log(error)
        //return callback(error);
        //console.log(body)
        //console.log(response.statusCode) console.log(response); console.log(body)
        if (error) {
          //console.log(body)
          //寄送密碼到郵件信箱中
          var mail_data = {
            mailFrom: 'postmaster@cycoholic.com.tw',
            mailTo: error2mails,
            title: '很遺憾的，POS機的服務GG了！通知',
            body: JSON.stringify(error) + '<br>' + JSON.stringify(options),
            attachments: []
          };

          //logger.info(mail_data);
          _sendMail(
            mail_data.mailFrom,
            mail_data.mailTo,
            mail_data.title,
            mail_data.body,
            mail_data.attachments,
            cb_sendMail
          );

          logger.error(error);
          //logger.error(error);
          //callback(body);
        } else {
          logger.info(body);
          callback(body);
        }
      });
    },

    create: function(data, callback) {
      var myJSONObject = data;
      var error2mails = _config.posgURL().error2mails;

      var options = {
        url: _config.posgURL().create,
        method: 'POST',
        json: true, // <--Very important!!!
        body: myJSONObject
      };

      console.log(options);
      logger.info(options);

      request(options, function(error, response, body) {
        //console.log(response.statusCode) console.log(response); console.log(body)
        if (error) {
          //console.log(body);
          //寄送密碼到郵件信箱中
          var mail_data = {
            mailFrom: 'postmaster@cycoholic.com.tw',
            mailTo: error2mails,
            title: '很遺憾的，POS機的服務GG了！通知',
            body: JSON.stringify(error) + '<br>' + JSON.stringify(options),
            attachments: []
          };

          //logger.info(mail_data);
          _sendMail(
            mail_data.mailFrom,
            mail_data.mailTo,
            mail_data.title,
            mail_data.body,
            mail_data.attachments,
            cb_sendMail
          );

          logger.error(error);
          //logger.error(error);
          //callback(body);
        } else {
          logger.info(body);
          callback(body);
        }
      });
    }
  };

  return CallposgWork;
};
