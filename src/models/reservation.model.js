const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Reservation = db.define("reservations", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Reservation;