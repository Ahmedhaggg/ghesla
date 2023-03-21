const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Gift = db.define("gifts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Gift;