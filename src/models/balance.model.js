const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Balance = db.define("balances", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(6, 2).UNSIGNED,
        allowNull: false
    },
    lastTransaction: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Balance;