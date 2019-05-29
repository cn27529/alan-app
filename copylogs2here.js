//var fs = require('fs');
var fs = require('fs-extra');

//category名字为inde.js 只收录warn以及以上权限信息
var logger = require('./logConfig').logger('./copylogs2here', 'debug');

// fs.copy('./logs2', './copylogs2here', function (err) {

//     if (err) {
//         console.error(err);
//     } else {
//         console.log("success!");
//     }

// });

//copies directory, even if it has subdirectories or files

// // Async with promises:
// fs.copy('./logs', './copylogs2here')
//     .then(() => console.log('copylogs2here success!'))
//     .catch(err => console.error(err))

//es5
fs.copy('./logs', './copylogs2here', function(err) {
  if (err) {
    logger.error(err);
    return console.error(err);
  }
  logger.info('copylogs2here success!');
  console.log('copylogs2here success!');
});
