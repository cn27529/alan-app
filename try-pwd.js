//console.log('hello test.js')
var logger = require('./logConfig').logger('./test-pwd', 'debug');

var PasswordWork = require('./works/PasswordWork');
var pw = new PasswordWork();

var options = process.argv;
//console.log(process.argv)

// // print process.argv
// process.argv.forEach(function (val, index, array) {
//     console.log(index, val);
// })

//自動切換env------------------20180121
var options = process.argv;
//console.log(options.length)
if (options.length < 3) {
  logger.info('沒有參數');
  return;
}

var pwd = options[2];
var encode_str = pw.encode(pwd);
console.log('encode you value=', encode_str);
var decode_str = pw.decode(encode_str);
console.log('decode you value=', decode_str);

var isencode = pw.defaultPassword(true);
//console.log('isencode', isencode)
var notencode = pw.defaultPassword(false);
//console.log('notencode', notencode)

var info = {
  encode: encode_str,
  decode: decode_str
};
logger.info(info);
//console.log(pw)
