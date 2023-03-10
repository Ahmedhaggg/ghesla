const { db } = require("../config/database");
const { DataTypes } = require("sequelize");

let ReservationCompletion = db.define("reservationsCompletion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    after: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    before: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = ReservationCompletion;