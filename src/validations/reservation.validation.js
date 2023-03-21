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
                check("additionalServicesIds")
                    .optional()
                    .isArray({ min: 0, max: 3 })
                    .withMessage(messages.arrayLength(0, 3)),
                check("carId")
                    .notEmpty()
                    .withMessage(messages.notEmpty),
                check("additionalServices")
                    .optional()
                    .isArray()
                    .withMessage(messages.isArray),
                check("paymentMethod")
                    .notEmpty()
                    .withMessage(messages.notEmpty)
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