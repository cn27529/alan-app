var nodemailer = require('nodemailer');
var models = require('../models');
var mg = require('nodemailer-mailgun-transport');
var moment = require('moment');

var logger = require('../logConfig').logger('./mail/test', 'debug');

nodemailer.SMTP = {
    host: "smtp.mailgun.org", //server位置
    port: 465, //可不給,預設25
    ssl: true, //可不給,預設false
    user: 'postmaster@cycoholic.com.tw', //可不給
    pass: '980928ac54e7979fdcda9ec79ba47ab6', //可不給
    use_authentication: true //可不給
}

// This is your API key that you retrieve from www.mailgun.com/cp (free up to
// 10K monthly emails)
var auth = {
    auth: {
        api_key: 'key-ea43e33092efb1f2842e9c113391e3bf',
        domain: 'cycoholic.com.tw'
    }
    //proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}

//create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(mg(auth));

var twNow = moment(new Date()).tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss')

//信件內容參數
var mailOptions = {
    from: 'postmaster@cycoholic.com.tw',
    to: 'cn27529@gmail.com, vincentlee986@gmail.com, billwstw@gmail.com',
    subject: '忘記密碼' + twNow,
    //text: 'TEST純文本內容',
    html: '<h1>Hello world 🐴</h1><br>Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
    attachments: [{
        //utf-8 string as an attachment
        filename: 'README.md',
        content: 'README.md'
    },]
};



//寄出
transporter.sendMail(mailOptions, function (err, info) {

    logger.info(mailOptions);

    //info是成功信件相關資訊;err是失敗相關資訊
    var mailMsg = "";

    if (err) {
        console.log(err);
        mailMsg = err.toString();
        logger.error(err);
    }

    if (info) {
        console.log(info);
        mailMsg = info;
        logger.info(info);
    }

    // models.Maillog.create({
    //     title: mailOptions.subject,
    //     body: mailOptions.html,
    //     mailFrom: mailOptions.from,
    //     mailTo: mailOptions.to,
    //     //cc:"",
    //     //bcc: "",
    //     attach: JSON.stringify(mailOptions.attachments),
    //     data: JSON.stringify(mailOptions),
    //     msg: JSON.stringify(info),
    //     yymmdd: yymmdd,
    //     localtime: twNow

    // try {

    // }
    // catch (err) {
    //     console.log(err);
    // }

});
