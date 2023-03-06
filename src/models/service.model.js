const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Service = db.define("services", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    isAdditional: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    numberOfReservation: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false
});


module.exports = Service;