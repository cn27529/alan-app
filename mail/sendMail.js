//引用 nodemailer
var nodemailer = require('nodemailer');
var models = require('../models');
var mg = require('nodemailer-mailgun-transport');
var moment = require('moment');

//category名字为inde.js 只收录warn以及以上权限信息
var logger = require('../logConfig').logger('./mail/sendMail', 'debug');

module.exports = function(
  mailFrom,
  mailTo,
  title,
  body,
  attachments,
  callpack
) {
  //https://app.mailgun.com/app/domains/cycoholic.com.tw

  // DOMAIN
  // cycoholic.com.tw
  // Domain Information
  // State
  // Active
  // IP Address
  // 184.173.153.202 Manage IPs
  // SMTP Hostname
  // smtp.mailgun.org
  // Default SMTP Login
  // postmaster@cycoholic.com.tw
  // API Base URL
  // https://api.mailgun.net/v3/cycoholic.com.tw
  // Default Password
  // 980928ac54e7979fdcda9ec79ba47ab6Manage SMTP credentials
  // API Key
  // key-ea43e33092efb1f2842e9c113391e3bf

  nodemailer.SMTP = {
    host: 'smtp.mailgun.org', //server位置
    port: 465, //可不給,預設25
    ssl: true, //可不給,預設false
    user: 'postmaster@cycoholic.com.tw', //可不給
    pass: '980928ac54e7979fdcda9ec79ba47ab6', //可不給
    use_authentication: true //可不給
  };

  // This is your API key that you retrieve from www.mailgun.com/cp (free up to
  // 10K monthly emails)
  var auth = {
    auth: {
      api_key: 'key-ea43e33092efb1f2842e9c113391e3bf',
      domain: 'cycoholic.com.tw'
    }
    //proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
  };

  //create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport(mg(auth));

  //信件內容參數
  var mailOptions = {
    from: mailFrom,
    to: mailTo,
    subject: title,
    html: body,
    attachments: attachments
  };

  // // verify connection configuration transporter.verify(function(error,
  // success) {     if (error) {         console.log(error);     } else {
  // console.log('Server is ready to take our messages');     } }); 寄出
  transporter.sendMail(mailOptions, function(err, info) {
    logger.info(mailOptions);

    //info是成功信件相關資訊;err是失敗相關資訊
    var mailMsg = '';

    if (err) {
      console.log(err);
      mailMsg = err.toString();
      logger.error(err);
    }

    if (info) {
      console.log(info);
      mailMsg = info.toString();
      logger.info(info);
    }

    console.log(typeof callpack);
    // do something
    if (typeof callpack === 'function') {
      callpack(
        mailMsg,
        mailOptions.subject,
        mailOptions.html,
        mailOptions.from,
        mailOptions.to
      );
    }
  });

  //return transporter;
};
