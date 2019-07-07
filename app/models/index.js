'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
//var env = process.env.NODE_ENV || "development";
//var env = process.env.NODE_ENV || "production";
var env = process.env.NODE_ENV || 'test';
//var env = process.env.NODE_ENV || "heroku";

//自動切換env------------------20180121
var options = process.argv;
//console.log(process.argv)
if (options.length >= 2 && options[2] === 'test') {
  env = process.env.NODE_ENV || 'test';
}
if (options.length >= 2 && options[2] === 'dev') {
  env = process.env.NODE_ENV || 'development';
}
if (options.length >= 2 && options[2] === 'prd') {
  env = process.env.NODE_ENV || 'production';
}

var config = require(path.join(__dirname, '..', 'config', 'db.json'))[env];

//category名字为inde.js 只收录warn以及以上权限信息
var logger = require('../logConfig').logger('./model/index', 'debug');

var qq = 'env run for ' + env + ', connection database is ' + config.database;

console.log(qq);
logger.info(qq);

if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
