let router = require("express").Router();
let authController = require("../controllers/auth.admin.controller");
let authValidation = require("../../validations/auth.admin.validation");
const adminCheckValidationError = require("../../middlewares/adminCheckValidationError");
const { catchErrors } = require("../../middlewares/adminCatchError");

router.get("/login", 
    catchErrors(authController.showLogin)
);

router.post("/login",  
    authValidation.validate("login"), 
    adminCheckValidationError, 
    catchErrors(authController.login)
)
module.exports = router;