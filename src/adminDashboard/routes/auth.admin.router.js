let router = require("express").Router();
let authController = require("../controllers/auth.admin.controller");
let authValidation = require("../../validations/auth.admin.validation");
const adminCheckValidationError = require("../../middlewares/adminCheckValidationError");
const { catchErrors } = require("../../middlewares/adminCatchError");
const { authRateLimiting } = require("../../config/rateLimiting");

router.get("/login", 
    // authRateLimiting,
    catchErrors(authController.showLogin)
);

router.post("/login",  
    // authRateLimiting,
    authValidation.validate("login"), 
    adminCheckValidationError, 
    catchErrors(authController.login)
)
module.exports = router;