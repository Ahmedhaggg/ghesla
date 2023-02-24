let crypto = require("crypto");

module.exports = async () => await crypto.randomInt(100000, 999999);
