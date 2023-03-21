const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let ReservationService = db.define("reservationsServices", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = ReservationService;