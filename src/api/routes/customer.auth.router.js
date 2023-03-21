let router = require("express").Router();
let customerAuthValidation = require("../../validations/customer.validation");
let customerAuthController = require("../controllers/customerAuth.controller");
let checkValidationError  = require("../../middlewares/checkValidationError");
let guards = require("../../middlewares/guards")
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

router.get("/profile",
    guards.apiGuards("customer"),
    customerAuthController.profile
)
module.exports = router;