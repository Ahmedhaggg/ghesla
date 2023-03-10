const { check } = require("express-validator");
const messages = require("../messages");

exports.passwordIsConfirmed = () =>
    (value, { req }) => {
        if (req.body.password !== value)
            throw new Error(messages.confirmPassword)
        return true;
    }