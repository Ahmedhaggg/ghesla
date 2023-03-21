let router = require("express").Router();
let reservationValidation = require("../../validations/reservation.validation");
let reservationController =require('../controllers/reservation.controller');
let checkValidationError = require("../../middlewares/checkValidationError")
let guards = require("../../middlewares/guards");
const uploader = require("../../middlewares/uploader");

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

router.get("/picker",
    guards.apiGuards("picker"),
    reservationController.findPickerReservations
);

router
    .route("/:id")
    .get( 
        guards.apiGuards("customer", "picker"),
        reservationController.show
    )
    .put(
        guards.apiGuards("picker"),
        uploader.uploadTwoFields("after", "before"),
        reservationValidation.validate("complete"),
        checkValidationError,
        reservationController.update
    )
module.exports = router;