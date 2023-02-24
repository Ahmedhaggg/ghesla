const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Car = db.define("cars", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Car;