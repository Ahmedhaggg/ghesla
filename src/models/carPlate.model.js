const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let CarPlate = db.define("carsPlates", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    letter: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = CarPlate;