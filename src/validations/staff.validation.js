let { check } = require("express-validator");
const { passwordIsConfirmed } = require("./customs/passwordIsConfirmed");
const messages = require("./messages");
                    // .isMobilePhone(['ar-SA'])

exports.validate = (method) => {
    switch (method) {
        case "create": 
        return [
            check("phoneNumber")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isMobilePhone("ar-EG")
                .withMessage(messages.isPhoneNumber),
            check("name")
                .notEmpty()
                .withMessage(messages.notEmpty),
            check("password")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isLength({ min: 8 })
                .withMessage(messages.passwordMinLength)
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
                .withMessage(messages.weekPassword),
            check("confirmPassword").custom(passwordIsConfirmed())
        ]
        case "login":
            return [
                check("phoneNumber")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("password")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
            ]
        default:
            break;
    }
}