const { DataTypes } = require("sequelize");
let { db } = require("../config/database");
let validationMessages = require("../validations/messages")
const  hashing = require("../utils/hashing");

let Staff = db.define("staff", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
        unique: {
            msg: validationMessages.isUnique
        }
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (admin) => {
          const hashedPassword = await hashing.hash(admin.password);
          admin.password = hashedPassword;
        }
    }
});


module.exports = Staff;