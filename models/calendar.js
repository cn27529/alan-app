'use strict';

module.exports = function(sequelize, DataTypes) {
  //https://cn27529.gitbooks.io/alan-app-book/content/photo_table.html
  var Calendar = sequelize.define(
    'Calendar',
    {
      title: DataTypes.STRING, //存放事件的標題
      people: DataTypes.STRING, //people的存放前日與前端討論過, 用半型逗號分隔開來不使用array, ex: '1,2,3,4,5' 這會是存ProfileId
      yyyymm: DataTypes.STRING, //2016/12
      start: DataTypes.STRING, //2016/12/01
      end: DataTypes.STRING, //2016/12/31
      all_day: DataTypes.STRING, //是不是整天
      reminder: DataTypes.STRING, //多久前通知
      calendar: DataTypes.STRING, //存放日曆的名稱
      notes: DataTypes.STRING, //存放事件的說明
      multiple: DataTypes.STRING, //multiple, 也是用半型逗號分隔開來不使用array, ex: '1,2,3,4,5' 這會是存'2016/12/12,2016,12/01'
      repeat_type: DataTypes.STRING, //存放repeat的類型day, week, hour,...
      repeat_detail: DataTypes.STRING, //repeat_detail, 也是用半型逗號分隔開來不使用array, ex: '1,2,3,4,5' 這會是存'w1,w3,w5'
      repeat_until: DataTypes.STRING, //存放repeat的單位, 分鐘, 秒, 或小時
      mode: DataTypes.STRING, //存放, single|multiple|repeat
      ProfileId: DataTypes.INTEGER
    },
    {
      freezeTableName: false,
      classMethods: {
        associate: function(models) {
          Calendar.belongsTo(models.Profile, {
            onDelete: 'CASCADE',
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );

  return Calendar;
};
