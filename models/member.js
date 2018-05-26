"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/cycoholic-book/content/member_table.html

    var Member = sequelize.define("Member", {
        memberid: DataTypes.STRING,
        pwd: DataTypes.STRING, //
        tag: DataTypes.STRING,
        flag: DataTypes.STRING,
        uuid: DataTypes.STRING, //node-uuid
        mobilphone: DataTypes.STRING,
        bonus: DataTypes.STRING,
        membername: DataTypes.STRING,
        sex: DataTypes.STRING,
        birthday: DataTypes.STRING,
        telephone: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        begindate: DataTypes.STRING,
        enddate: DataTypes.STRING,
        aflag: DataTypes.STRING,
        exchangedatetime: DataTypes.STRING,
        utctime: DataTypes.STRING //UTC時間

    }, {
        // 如果为 true 则表的名称和 model 相同，
        // 为 false MySQL创建的表名称加上复数s
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: false
    });

    return Member;

};