'use strict';

module.exports = function(sequelize, DataTypes) {
  //https://cn27529.gitbooks.io/alan-app-book/content/note_table.html
  var Msglog = sequelize.define(
    'Msglog',
    {
      tag: DataTypes.STRING, //email or msg
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      data: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      msg: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
      yymmdd: DataTypes.STRING,
      localtime: DataTypes.STRING //yyyy-mm-dd hh:mm:ss
    },
    {
      freezeTableName: false
    }
  );

  return Msglog;
};
