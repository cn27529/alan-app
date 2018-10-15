"use strict";

//category名字为inde.js 只收录warn以及以上权限信息
var logger = require('../logConfig').logger('./model/account', 'debug');

module.exports = function (sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/cycoholic-book/content/account_table.html

    var Account = sequelize.define("Account", {
        email: DataTypes.STRING,
        password: DataTypes.STRING
        //credate: DataTypes.STRING
    }, {
            freezeTableName: false,
            classMethods: {
                associate: function (models) {
                    Account.hasMany(models.Profile);
                }
            }
        });

    return Account;

};
