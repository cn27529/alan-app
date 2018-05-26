"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/cycoholic-book/content/note_table.html
    var Note = sequelize.define("Note", {
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        noteday: DataTypes.STRING
    }, {
        freezeTableName: false,
        classMethods: {
            associate: function(models) {
                Note.belongsTo(models.Profile, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Note;
};
