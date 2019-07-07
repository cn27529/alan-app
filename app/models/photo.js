'use strict';

module.exports = function(sequelize, DataTypes) {
  //https://cn27529.gitbooks.io/alan-app-book/content/photo_table.html
  var Photo = sequelize.define(
    'Photo',
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      photoday: DataTypes.STRING,
      ProfileId: DataTypes.INTEGER
    },
    {
      freezeTableName: false,
      classMethods: {
        associate: function(models) {
          Photo.hasMany(models.Photo_image);
        }
      }
    }
  );

  return Photo;
};
