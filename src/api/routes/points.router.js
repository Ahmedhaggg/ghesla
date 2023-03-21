let router = require("express").Router();
let pointValidation = require("../../validations/points.validation");
let pointController =require('../controllers/points.controller');
let checkValidationError = require("../../middlewares/checkValidationError")
let guards = require("../../middlewares/guards");

router
    .put("/",
        guards.apiGuards("staff"),
        pointValidation.validate("increment"),
        checkValidationError,
        pointController.increment
    )

module.exports = router;