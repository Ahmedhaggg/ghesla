let { check, body } = require("express-validator");
const messages = require("./messages");
exports.validate = (method) => {
    switch (method) {
        case "create":
            return [
                check("model")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("color")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("plate.letter")
                    .if(body("plate").exists())
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("plate.number")
                    .if(body("plate").exists())
                    .notEmpty()
                    .withMessage(messages.notEmpty),
            ]    
        default:
            break;
    }
}