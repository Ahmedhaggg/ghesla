const { check } = require("express-validator");
const messages = require("../messages");

exports.isNewDate = () => 
    (value) => {
        console.log("validate")
        console.log(new Date(value) < new Date())
        if (new Date(value) < new Date())
            throw new Error(messages.isExpiredDate)
        return true
    }