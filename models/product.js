"use strict";

module.exports = function (sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/alan-app-db/content/Product_table.html
    var Product = sequelize.define("Product", {
        PId: DataTypes.STRING, //
        PClass: DataTypes.STRING,
        PName: DataTypes.STRING,
        PSpecification: DataTypes.STRING, //
        PUnit: DataTypes.STRING, //
        localtime: DataTypes.STRING //
    }, {
            freezeTableName: false
        });

    return Product;
};
