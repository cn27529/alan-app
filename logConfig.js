//https://www.jianshu.com/p/9604d08db899

var log4js = require('log4js');
var fs = require('fs');

var levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL
};

// log4js = require('log4js');
log4js.configure({
  appenders: {
    cheese: {
      type: 'dateFile',
      filename: './logs/',
      //filename: 'logs', // 需要手动创建此文件夹
      pattern: 'yyMMdd.txt',
      absolute: true, // filename是否绝对路径
      lwaysIncludePattern: true,
      alwaysIncludePattern: true // 文件名是否始终包含占位符
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  },
  replaceConsole: true // 替换 console.log
});

exports.logger = function(name, level) {
  var logger = log4js.getLogger(name);
  //默认为debug权限及以上
  //https://github.com/log4js-node/log4js-node
  logger.level = levels[level] || levels['debug'];
  return logger;
};

exports.use = function(app, level) {
  //加载中间件
  app.use(
    log4js.connectLogger(log4js.getLogger('logInfo'), {
      level: levels[level] || levels['debug'],
      //格式化http相关信息
      format: ':method :url :status'
    })
  );
  //
};
