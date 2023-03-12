let router = require("express").Router();
let pickerAuthValidation = require("../../validations/picker.validation");
let pickerAuthController = require("../controllers/picker.auth.controller");
let checkValidationError  = require("../../middlewares/checkValidationError");
let reservationController =require('../controllers/reservation.controller');
let guards = require("../../middlewares/guards");

router.post("/auth/login",
    pickerAuthValidation.validate("login"),
    checkValidationError,
    pickerAuthController.login
);

module.exports = router;