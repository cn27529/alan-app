"use strict";

module.exports = function (sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/alan-app-db/content/supplier_table.html
    var Supplier = sequelize.define("supplier", {
        SId: DataTypes.STRING, //
        SName: DataTypes.STRING,
        STel: DataTypes.STRING,
        SFax: DataTypes.STRING,
        SFax: DataTypes.STRING,
        SAddress: DataTypes.STRING,
        localtime: DataTypes.STRING //
    }, {
            freezeTableName: false
        });

    return Supplier;

};
