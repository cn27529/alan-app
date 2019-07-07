//console.log('hello test.js')

var HelloWork = require('./works/HelloWork');
var PasswordWork = require('./works/PasswordWork');
var ConfigSettingWork = require('./works/ConfigSettingWork');

//log4js---------------20180124
var logger = require('./logConfig').logger('./test', 'debug');

var _config = new ConfigSettingWork();
console.log(_config.posgURL().update);

//logger.error('test...................write logger error')
logger.info(_config.posgURL().update);

// var hello = new HelloWork()
// var pw = new PasswordWork()

// console.log(hello.hi())
// var encode_str = pw.encode('123456@789!Q')
// console.log('encode_str=',encode_str)
// var decode_str = pw.decode(encode_str)
// console.log('decode_str=', decode_str)

// var isencode = pw.defaultPassword(true)
// console.log(isencode)
// var notencode = pw.defaultPassword(false)
// console.log(notencode)

// console.log(pw)
