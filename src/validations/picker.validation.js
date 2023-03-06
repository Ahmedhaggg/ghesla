let { check, body } = require("express-validator");
const messages = require("./messages");
exports.validate = (method) => {
    let fields = [
        check("email")
            .notEmpty()
            .withMessage(messages.notEmpty),
        check("name")
            .notEmpty()
            .withMessage(messages.notEmpty),
        check("phoneNumber")
            .notEmpty()
            .withMessage(messages.notEmpty)
            .isMobilePhone("ar-EG")
            .withMessage(messages.isPhoneNumber),
    ]
    switch (method) {
        case "create":
            return [
                ...fields,
                check("password")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isLength({ min: 8 })
                    .withMessage(messages.passwordMinLength)
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
                    .withMessage(messages.weekPassword),
                check("confirmPassword")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .custom((value, { req }) => {
                        if (req.body.password !== value)
                            throw new Error(messages.confirmPassword)
                        return true;
                    }),
                check("startWorkAt")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .custom(value => {
                        if (value < new Date())
                            throw new Error(messages.isExpiredDate)
                        return true;
                    })
                    
            ];    
        case "login": 
            return [
                fields[0],
                check("password")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
            ]
        case "update":
            return fields
        default:
            break;
    }
}