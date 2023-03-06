let { check } = require("express-validator");
const messages = require("./messages");
                    // .isMobilePhone(['ar-SA'])

exports.validate = (method) => {
    switch (method) {
        case "create":
            return [
                check("serviceId")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("location")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("additionalServiceId")
                    .optional()
                    .isArray({ min: 1, max: 3})
                    .withMessage(messages.arrayLength)
            ] 
        default:
            break;
        }
}