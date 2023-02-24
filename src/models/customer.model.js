const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Customer = db.define("customers", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false,
    unique: ["phoneNumber"]
});


module.exports = Customer;