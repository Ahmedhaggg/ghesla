let router = require("express").Router();
let customerAuthValidation = require("../../validations/customer.validation");
let customerAuthController = require("../controllers/customerLogin.controller");
let checkValidationError  = require("../../middlewares/checkValidationError");

router.post("/login",
    customerAuthValidation.validate("login"),
    checkValidationError,
    customerAuthController.login
);

router.post("/login/verify",
    customerAuthValidation.validate("verifyLogin"),
    checkValidationError,
    customerAuthController.verify
);

router.post("/register",
    customerAuthValidation.validate("register"),
    checkValidationError,
    customerAuthController.register
);

module.exports = router;