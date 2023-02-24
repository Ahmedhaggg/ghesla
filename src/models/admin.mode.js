const { DataTypes } = require("sequelize");
let { db } = require("../config/database");
const  hashing = require("../utils/hashing");

let Admin = db.define("admins", {
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
    password: {
        type: DataTypes.STRING(120),
        allowNull: false
    }
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (admin) => {
          const hashedPassword = await hashing.hash(admin.password);
          admin.password = hashedPassword;
        }
    },
    unique: ["email"]
});


module.exports = Admin;