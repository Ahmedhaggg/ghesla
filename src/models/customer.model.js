const { DataTypes } = require("sequelize");
let { db } = require("../config/database");
let validationMessages = require("../validations/messages")

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
        unique: {
            msg: validationMessages.isUnique
        }
    }, 
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            msg: validationMessages.isUnique
        }
    },
    birthDay: {
        type: DataTypes.DATE,
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