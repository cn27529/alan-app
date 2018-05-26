var sendMail = require('./sendMail');
var models = require('../models');
var moment = require('moment');

var twNow = moment(new Date()).tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss')
var yymmdd = moment(new Date()).tz("Asia/Taipei").format('YYYY-MM-DD')

var logger = require('../logConfig').logger('./mail/lostpwd', 'debug');

//props
var mail_data = {
    mailFrom: 'postmaster@cycoholic.com.tw',
    mailTo: 'cn27529@gmail.com',
    title: '忘記密碼' + twNow,
    body: 'Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
    pwd: '123456',
    attachments: []
    // attachments: [{ 
    //     //utf-8 string as an attachment
    //     filename: 'README.md',
    //     content: 'README.md'
    // }]
}

mail_data.body = 'Dear ' + mail_data.mailTo + ',<br>Thank you for contacting us<br>This is your password: ' + mail_data.pwd + '<br>For your account security, please change your passowrd later.';

sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, mail_data.attachments, sendMailCallback);

//callback function
function sendMailCallback(mailMsg, subject, html, from, to) {

    //console.log(mailMsg);
    //console.log("run sendMailCallback: " + twNow);

    models.Maillog.create({

        title: mail_data.title,
        body: mail_data.body,
        mailFrom: mail_data.mailFrom,
        mailTo: mail_data.mailTo,
        //cc:"",
        //bcc: "",
        attach: JSON.stringify(mail_data.attachments),
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
