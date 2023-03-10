let { check } = require("express-validator");
const { isFile } = require("./customs/isFile");
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
                    .withMessage(messages.arrayLength),
                check("carId")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("additionalServices")
                    .optional()
                    .isArray()
                    .withMessage(messages.isArray),
            ];
        case "complete":
            return [
                check("after").custom(isFile("after")),
                check("before").custom(isFile("before"))
            ];
        default:
            break;
        }
}