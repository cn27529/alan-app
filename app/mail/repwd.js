//引用 nodemailer
var sendMail = require('./sendMail');
var hello = require('./hello');
var models = require('../models');

var logger = require('../logConfig').logger('./mail/repwd', 'debug');

//props
var mail_data = {
  //mailFrom: 'mycloudedlife1@gmail.com',
  mailFrom: 'service@mycloudedlife.com',
  mailTo: 'cn27529@gmail.com',
  title: '忘記密碼',
  body:
    'Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
  pwd: '1234qwer'
};

// to bruce, 這是忘記密碼訊息
//
// Dear XXX,
// Thank you for contacting us
//
// This is your password: @@@$$$$.
// For your account security, please change your passowrd later.

mail_data.body =
  'Dear ' +
  mail_data.mailTo +
  ',<br>Thank you for contacting us<br>This is your password: ' +
  mail_data.pwd +
  '<br>For your account security, please change your passowrd later.';

var now = new Date();
var month = now.getMonth() + 1;
var yy =
  now.getFullYear() <= 9
    ? '0' + now.getFullYear().toString()
    : now.getFullYear().toString();
var mm = month <= 9 ? '0' + month.toString() : month.toString();
var dd =
  now.getDate() <= 9
    ? '0' + now.getDate().toString()
    : now.getDate().toString();

models.Maillog.create({
  title: mail_data.title,
  body: mail_data.body,
  mailFrom: mail_data.mailFrom,
  mailTo: mail_data.mailTo,
  msg: '',
  yymmdd: yy + mm + dd,
  yymm: yy + mm
})
  .then(function(data) {
    console.log(data);
    console.log('models.Maillog.create');
  })
  .catch(function(err) {
    console.log(err);
  });

sendMail(
  mail_data.mailFrom,
  mail_data.mailTo,
  mail_data.title,
  mail_data.body,
  sendMailCallback
);

//callback function
function sendMailCallback(mailMsg, subject, html, from, to) {
  var now = new Date();
  var month = now.getMonth() + 1;
  var yy =
    now.getFullYear() <= 9
      ? '0' + now.getFullYear().toString()
      : now.getFullYear().toString();
  var mm = month <= 9 ? '0' + month.toString() : month.toString();
  var dd =
    now.getDate() <= 9
      ? '0' + now.getDate().toString()
      : now.getDate().toString();

  console.log(mailMsg);
  console.log('sendMailCallback: ' + now.toLocaleString());
}
