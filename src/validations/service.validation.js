let { check, body, query } = require("express-validator");
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
                    .if(body("discount.percentage").notEmpty() || body("discount.expirationAt").notEmpty())
                    .isNumeric()
                    .withMessage(messages.isNumber),
                check("discount.expirationAt")
                    .if(body("discount.percentage").notEmpty() || body("discount.expirationAt").notEmpty())
                    .custom((value) => {
                        console.log(value)
                        console.log(new Date())
                        console.log(value < new Date())
                        if (value < new Date())
                            throw new Error(messages.isExpiredDate)
                        return true
                    })

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