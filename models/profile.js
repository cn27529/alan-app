"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/cycoholic-book/content/profile_table.html
    var Profile = sequelize.define("Profile", {
        name: DataTypes.STRING,
        birthday: DataTypes.STRING,
        sex: DataTypes.STRING,
        role: DataTypes.STRING,
        image: DataTypes.TEXT('medium'),
        flag: DataTypes.STRING,
        AccountId: DataTypes.INTEGER
    }, {
      freezeTableName: false,
      classMethods: {
        associate: function(models) {
          Profile.belongsTo(models.Account, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });


        }
      }
    });

    //Profile.hasMany(models.Note);
    //Profile.hasMany(models.Photo);

    return Profile;
};
