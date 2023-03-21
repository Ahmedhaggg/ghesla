let router = require("express").Router();
let staffAuthValidation = require("../../validations/staff.validation");
let staffAuthController = require("../controllers/staffAuth.controller");
let checkValidationError  = require("../../middlewares/checkValidationError");
// const { authRateLimiting } = require("../../config/rateLimiting");

router.post("/auth/login",
    // authRateLimiting,
    staffAuthValidation.validate("login"),
    checkValidationError,
    staffAuthController.login
);

module.exports = router;