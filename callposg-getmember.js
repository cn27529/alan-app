// console.log('hello test.js') var HelloWork = require('./works/HelloWork') var
// PasswordWork = require('./works/PasswordWork') var ConfigSettingWork =
// require('./works/ConfigSettingWork')

var CallposgWork = require('./works/CallposgWork');
var _callposg = new CallposgWork();

//category名字为inde.js 只收录warn以及以上权限信息
var logger = require('./logConfig').logger('./callposg-getmember', 'debug');

var mobilphone = '';
var options = process.argv;
//console.log(process.argv)
if (options.length >= 3) {
  mobilphone = options[3];
}

if (mobilphone != '') {
  _callposg.getmember(mobilphone, function(cb_data) {
    console.log(cb_data);
    logger.error(cb_data);
  });
} else {
  var logmsg = 'mobilphone is empty value';
  console.log(logmsg);
  logger.error(logmsg);
}
