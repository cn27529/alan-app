"use strict";

module.exports = function (sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/alan-app-db/content/classification_table.html
    var Classification = sequelize.define("classification", {
        CId: DataTypes.STRING, //
        CName: DataTypes.STRING,
        localtime: DataTypes.STRING //
    }, {
            freezeTableName: false
        });

    return Classification;
};
