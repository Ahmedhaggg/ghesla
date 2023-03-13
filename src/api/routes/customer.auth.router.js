let router = require("express").Router();
let customerAuthValidation = require("../../validations/customer.validation");
let customerAuthController = require("../controllers/customerLogin.controller");
let checkValidationError  = require("../../middlewares/checkValidationError");
const { authRateLimiting } = require("../../config/rateLimiting");

router.post("/login",
    // authRateLimiting,
    customerAuthValidation.validate("login"),
    checkValidationError,
    customerAuthController.login
);

router.post("/login/verify",
    // authRateLimiting,
    customerAuthValidation.validate("verifyLogin"),
    checkValidationError,
    customerAuthController.verify
);

router.post("/register",
    // authRateLimiting,
    customerAuthValidation.validate("register"),
    checkValidationError,
    customerAuthController.register
);

module.exports = router;