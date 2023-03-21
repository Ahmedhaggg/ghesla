let router = require("express").Router();
let balanceValidation = require("../../validations/balance.validation");
let balanceController =require('../controllers/balance.controller');
let checkValidationError = require("../../middlewares/checkValidationError")
let guards = require("../../middlewares/guards");

router.put("/",
    guards.apiGuards("staff"),
    balanceValidation.validate("increment"),
    checkValidationError,
    balanceController.increment
)

module.exports = router;