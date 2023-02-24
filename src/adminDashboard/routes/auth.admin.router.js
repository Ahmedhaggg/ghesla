let router = require("express").Router();
let authController = require("../controllers/auth.admin.controller");
let authValidation = require("../../validations/auth.admin.validation");
const adminCheckValidationError = require("../../middlewares/adminCheckValidationError");

router.get("/login", 
    authController.showLogin
);

router.post("/login",  
    authValidation.validate("login"), 
    adminCheckValidationError, 
    authController.login
)
// authController.register();
module.exports = router