const { DataTypes } = require("sequelize");
let { db }  = require("../config/database");

let ReservationStatus = db.define("reservation_status", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = ReservationStatus;