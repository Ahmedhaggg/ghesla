const { check } = require("express-validator");
const messages = require("../messages");

exports.isNewDate = () => 
    (value) => {
        if (new Date(value) < new Date())
            throw new Error(messages.isExpiredDate)
        return true
    }