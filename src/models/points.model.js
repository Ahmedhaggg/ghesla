const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Points = db.define("points", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Points;