const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let ReservationTime = db.define("reservationsTime", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = ReservationTime;