let { check } = require("express-validator");
const messages = require("./messages");
exports.validate = (method) => {
    switch (method) {
        case "create":
            return [
                check("name")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
            ]    
        default:
            break;
    }
}