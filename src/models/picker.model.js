const { DataTypes } = require("sequelize");
let { db } = require("../config/database");

let Picker = db.define("pickers", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false
    }
}, {
    timestamps: false,
    unique: ["email"]
});


module.exports = Picker;