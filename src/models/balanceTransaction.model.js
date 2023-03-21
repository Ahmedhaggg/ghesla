const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let BalanceTransaction = db.define("balanceTransactions", {
    amount: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = BalanceTransaction;