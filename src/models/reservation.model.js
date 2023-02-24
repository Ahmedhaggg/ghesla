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
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    tax: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ["recieved", "doing", "completed"]
    }
}, {
    timestamps: false
});


module.exports = Reservation;