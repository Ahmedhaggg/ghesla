let { check, body } = require("express-validator");
const messages = require("./messages");
exports.validate = (method) => {
    switch (method) {
        case "increment":
            return [
                check("points")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isNumeric()
                    .withMessage(messages.isNumber),
                check("phoneNumber")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isMobilePhone("ar-EG")
                    .withMessage(messages.isPhoneNumber)
            ]    
        default:
            break;
    }
}