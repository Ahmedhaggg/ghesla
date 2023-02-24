const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let CustomerLoginVerification = db.define("customersLoginVerification", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiresin: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = CustomerLoginVerification;