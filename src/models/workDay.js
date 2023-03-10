const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let WorkDay = db.define("workDays", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isHoliday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});


module.exports = WorkDay;