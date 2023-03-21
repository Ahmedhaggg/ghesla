const { DataTypes } = require("sequelize");
const { BALANCE, POINTS } = require("../config/constants");
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
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [BALANCE, POINTS]
    }
}, {
    timestamps: false
});


module.exports = Reservation;