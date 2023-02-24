let { check } = require("express-validator");
const messages = require("./messages");
                    // .isMobilePhone(['ar-SA'])

exports.validate = (method) => {
    switch (method) {
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
                        console.log(value.toString().length)
                        if (value.toString().length !== 6)
                            throw new Error(messages.isVerificationCode)
                        return true;
                    })
            ]
        default:
            break;
    }
}