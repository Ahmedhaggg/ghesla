let { check } = require("express-validator");
const { passwordIsConfirmed } = require("./customs/passwordIsConfirmed");
const messages = require("./messages");
                    // .isMobilePhone(['ar-SA'])

exports.validate = (method) => {
    switch (method) {
        case "register": 
        return [
            check("phoneNumber")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isMobilePhone("ar-EG")
                .withMessage(messages.isPhoneNumber),
            check("email")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isEmail()
                .withMessage(messages.isEmail),
            check("password")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isLength({ min: 8 })
                .withMessage(messages.passwordMinLength)
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
                .withMessage(messages.weekPassword),
            passwordIsConfirmed(),
            check("name")
                .notEmpty()
                .withMessage(messages.notEmpty),
            check("cityId")
                .notEmpty()
                .withMessage(messages.notEmpty),
            check("birthDay.year")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isNumeric()
                .withMessage(messages.isNumber),
            check("birthDay.month")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isNumeric()
                .withMessage(messages.isNumber),
            check("birthDay.day")
                .notEmpty()
                .withMessage(messages.notEmpty)
                .isNumeric()
                .withMessage(messages.isNumber),
        ]
        case "login":
            return [
                check("phoneNumber")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isMobilePhone("ar-EG")
                    .withMessage(messages.isPhoneNumber),
            ]    
        case "verifyLogin": 
            return [
                check("phoneNumber")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .isMobilePhone("ar-EG")
                    .withMessage(messages.isPhoneNumber),
                check("code")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
                    .custom((value) => {
                        if (value.toString().length !== 6)
                            throw new Error(messages.isVerificationCode)
                        return true;
                    })
            ]
        default:
            break;
    }
}