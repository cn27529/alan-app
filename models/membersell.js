'use strict';

module.exports = function(sequelize, DataTypes) {
  //https://cn27529.gitbooks.io/alan-app-book/content/membersell_table.html
  var MemberSell = sequelize.define(
    'MemberSell',
    {
      //AccountId: DataTypes.INTEGER,
      memberid: DataTypes.STRING,
      uuid: DataTypes.STRING, //node-uuid
      bonus: DataTypes.STRING,
      begindate: DataTypes.STRING,
      enddate: DataTypes.STRING
    },
    {
      freezeTableName: false
      // classMethods: {
      //     associate: function(models) {
      //         MemberSell.hasMany(models.Member)
      //     }
      // }
    }
  );

  return MemberSell;
};
