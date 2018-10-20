"use strict";

module.exports = function (sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/alan-app-db/content/classification_table.html
    var Classification = sequelize.define("Classification", {
        CId: DataTypes.STRING, //
        CName: DataTypes.STRING,
        localtime: DataTypes.STRING
    }, {
        freezeTableName: false,
        classMethods: {
            associate: function (models) {
                //Classification.hasMany(models.Product);
                Classification.hasMany(models.Product, {foreignKey: 'PClass', sourceKey: 'CId'});
            }
        }
        });

    return Classification;
};
