var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var logger = require('../logConfig').logger('router_use', 'debug');

//https://ithelp.ithome.com.tw/articles/10202754
//https://expressjs.com/zh-cn/guide/using-middleware.html
//https://blog.gtwang.org/programming/learn-to-use-the-new-router-in-expressjs-4/

//請求路由時，會經過它
router.use(function(req, res, next) {
  //
  logger.info('req.originalUrl=' + req.originalUrl);
  // logger.info('req.baseUrl=' + req.baseUrl);
  logger.info('req.method=' + req.method);
  logger.info('req.url=' + req.url);
  logger.info('req.path=' + req.path);
  // logger.info('req.route=' + req.route);
  // logger.info('req.protocol=' + req.protocol);
  // logger.info('req.params=' + JSON.stringify(req.params));
  // logger.info('req.signedCookies=' + JSON.stringify(req.signedCookies));
  // logger.info('req.subdomains=' + JSON.stringify(req.subdomains));
  // logger.info('req.xhr=' + JSON.stringify(req.xhr));

  console.log(req.method, req.url);

  next();
});

// 將路由套用至應用程式
//router.use('/', router);

module.exports = router;
