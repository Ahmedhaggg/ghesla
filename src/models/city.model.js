const { DataTypes } = require("sequelize");
let { db } = require("../config/database");
let validationMessages = require("../validations/messages")

let City = db.define("cities", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }, 
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: {
            msg: validationMessages.isUnique
        }
    }

}, { timestamps: false });

module.exports = City;
