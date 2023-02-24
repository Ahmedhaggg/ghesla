const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let ServiceDiscount = db.define("servicesDiscounts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    expirationAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
});


module.exports = ServiceDiscount;