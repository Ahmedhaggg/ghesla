const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let ReservationAdditionalService = db.define("reservationsAdditionalServices", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = ReservationAdditionalService;