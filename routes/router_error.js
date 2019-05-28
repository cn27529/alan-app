var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var logger = require('../logConfig').logger('router_error', 'debug');

//https://blog.gtwang.org/programming/learn-to-use-the-new-router-in-expressjs-4/

// // catch 404 and forward to error handler
// router.use(function(err, req, res, next) {
//   res.status(404);
//   //next(err); res.render('error', {err: err});
//   console.log(err);
//   logger.error(err);
//   res.end();
// });

// // error handler no stacktraces leaked to user unless in development environment
// router.use(function(err, req, res, next) {
//   logger.error(err);
//   res.status(err.status || 500);

//   res.json({
//     msg: err.message,
//     err: app.get('env') === 'development' ? err : {}
//   });

// });

// 若 1. 前面的 middleware 都沒人處理 或 2. 沒有比對到路徑片斷，就會到這裡。
// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404)); // 引起 Error, 實際上是 HttpError，它繼承 Error。 給下一個 error-handling middleware　處理。
});

// 最後的 error-handling middleware
// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');

  var title = req.originalUrl + '';

  res.render('error', {
    title: title,
    cool: cool(),
    error: req.app.get('env') === 'development' ? err : '',
    message: err.message,
    layout: '_tocas-layout'
  });
  //end
});

module.exports = router;
