let { check, body } = require("express-validator");
const messages = require("./messages");
exports.validate = (method) => {
    switch (method) {
        case "login":
            return [
                check("email")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("password")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
            ]    
        default:
            break;
    }
}