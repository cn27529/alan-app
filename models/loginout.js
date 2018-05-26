"use strict";

module.exports = function (sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/cycoholic-book/content/Loginout_table.html

    var Loginout = sequelize.define("Loginout", {
        tag: DataTypes.STRING, //login or logout
        login: DataTypes.STRING, //可能是電話，email，其它的值都可以
        pwd: DataTypes.STRING,
        data: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
        msg: DataTypes.STRING, //可能是array，string，json，xml，其它的值都可以
        yymmdd: DataTypes.STRING,
        localtime: DataTypes.STRING, //yyyy-mm-dd hh:mm:ss
        ip: DataTypes.STRING,
        device: DataTypes.STRING //pc，mobile，pad and more
    }, {
        freezeTableName: false
        // classMethods: {
        //     associate: function (models) {
        //         Loginout.belongsTo(models.Member, {
        //             onDelete: "CASCADE",
        //             foreignKey: {
        //                 allowNull: false
        //             }
        //         });
        //     }
        // }
    });

    return Loginout;

};
