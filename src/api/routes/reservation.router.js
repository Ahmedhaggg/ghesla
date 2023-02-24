let router = require("express").Router();
let reservationValidation = require("../../validations/reservation.validation");
let reservationController =require('../controllers/reservation.controller');
let checkValidationError = require("../../middlewares/checkValidationError")
let guards = require("../../middlewares/guards");

router
    .route("/")
    .get(
        guards.apiGuards("customer"),
        reservationController.index
    )
    .post(
        guards.apiGuards("customer"),
        reservationValidation.validate("create"),
        checkValidationError,
        reservationController.create
    )

router.get("/:id", 
    guards.apiGuards("customer", "picker"),
    reservationController.show
)


module.exports = router;