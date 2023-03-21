let { check, body } = require("express-validator");
const messages = require("./messages");
exports.validate = (method) => {
    switch (method) {
        case "create":
            return [
                check("recieverPhoneNumber")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isMobilePhone("ar-EG")
                    .withMessage(messages.isPhoneNumber),
                check("message")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isLength({ min: 10, max: 100 })
                    .withMessage(messages.invalidLengthGiftMessage),
                check("amount")
                    .if(body("plate").exists())
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isNumeric()
                    .withMessage(messages.isNumber),
            ]    
        default:
            break;
    }
}