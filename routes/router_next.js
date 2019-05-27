var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var logger = require('../logConfig').logger('router_next', 'debug');

//請求路由時，會經過它
router.use(function(req, res, next) {
  //
  logger.info('req.originalUrl=' + req.originalUrl);
  logger.info('req.baseUrl=' + req.baseUrl);
  logger.info('req.path=' + req.path);
  logger.info('req.route=' + req.route);
  logger.info('req.protocol=' + req.protocol);
  logger.info('req.params=' + JSON.stringify(req.params));
  logger.info('req.signedCookies=' + JSON.stringify(req.signedCookies));
  logger.info('req.subdomains=' + JSON.stringify(req.subdomains));
  logger.info('req.xhr=' + JSON.stringify(req.xhr));

  next();
});

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
