const { Sequelize } = require('sequelize');
const { 
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS
} = require("./index")
console.log(DB_HOST)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "mysql"
});
 
sequelize.authenticate()
    .then(() => console.log("database connected"))
    .catch((err) =>console.log("database error", err))

// sequelize.sync({ force: true });
exports.db = sequelize; 

