"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/alan-app-book/content/photo_image_table.html
    var Photo_image = sequelize.define("Photo_image", {
        title: DataTypes.STRING,
        image: DataTypes.TEXT('medium'),
        PhotoId: DataTypes.INTEGER,
        ProfileId: DataTypes.INTEGER
    }, {
      freezeTableName: false,
      classMethods: {
        associate: function(models) {
          Photo_image.belongsTo(models.Photo, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });

    return Photo_image;
};
