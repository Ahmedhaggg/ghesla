const { DataTypes } = require("sequelize");
let { db } = require("../config/database");
let validationMessages = require("../validations/messages")

let Picker = db.define("pickers", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        unique: {
            msg: validationMessages.isUnique
        }
    },
    email: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: {
            msg: validationMessages.isUnique
        }
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    isWorking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});


module.exports = Picker;