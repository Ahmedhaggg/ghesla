let { check, body, query } = require("express-validator");
const { isFile } = require("./customs/isFile");
const { isNewDate } = require("./customs/isNotExpiredDate");
const messages = require("./messages");
                    // .isMobilePhone(['ar-SA'])
exports.validate = (method) => {
    let create = [
        check("name")
            .notEmpty()
            .withMessage(messages.notEmpty),
        check("description")
            .notEmpty()
            .withMessage(messages.notEmpty),
        check("price")
            .notEmpty()
            .withMessage(messages.notEmpty),
        check("isAdditional")
            .notEmpty()
            .withMessage(messages.notEmpty)
            .toBoolean()
    ]
    switch (method) {
        case "create":
            return [
                ...create,
                check("discount.percentage")
                    .if(body("discount.expirationAt").notEmpty())
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isNumeric()
                    .withMessage(messages.isNumber),
                check("discount.expirationAt")
                    .if(body("discount.percentage").notEmpty())
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .custom(isNewDate()),
                check("image").custom(isFile("image"))
            ] 
        
        case "update": 
            return create
        case "index": 
            return [
                query("isAdditional").toBoolean()
            ]
        default:
            break;
    }
}