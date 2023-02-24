let { check, body, query } = require("express-validator");
const messages = require("./messages");
                    // .isMobilePhone(['ar-SA'])
exports.validate = (method) => {
    let create = [
        check("percentage")
            .notEmpty()
            .withMessage(messages.notEmpty)
            .isNumeric()
            .withMessage(messages.isNumber),
        check("expirationAt")
            .notEmpty()
            .withMessage(messages.notEmpty)
            .custom((value) => {
                if (value < new Date())
                    throw new Error(messages.isExpiredDate)
                return true
            })
    ]
    switch (method) {
        case "create":
            return create;
        
        case "update": 
            return create;
        default:
            break;
    }
}