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
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }, 
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    birthDay: {
        type: DataTypes.DATE(20),
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM,
        values: ["انثي" , "ذكر"],
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Customer;