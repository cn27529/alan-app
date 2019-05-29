'use strict';

module.exports = function(sequelize, DataTypes) {
  //https://cn27529.gitbooks.io/alan-app-book/content/note_table.html
  var Maillog = sequelize.define(
    'Maillog',
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      mailFrom: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      mailTo: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      cc: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      bcc: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      attach: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      data: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      msg: DataTypes.STRING,
      yymmdd: DataTypes.STRING,
      localtime: DataTypes.STRING //yyyy-mm-dd hh:mm:ss
    },
    {
      freezeTableName: false
    }
  );

  return Maillog;
};
