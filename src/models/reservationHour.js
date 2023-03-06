const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let WorkHour = db.define("workHours", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    hour: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    availablePlaces: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = WorkHour;