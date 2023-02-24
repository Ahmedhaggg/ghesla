let router = require("express").Router();
let carValidation = require("../../validations/car.validation");
let carController =require('../controllers/car.controller');
let checkValidationError = require("../../middlewares/checkValidationError")
let guards = require("../../middlewares/guards")
router
    .route("/")
    .get(
        guards.apiGuards("customer"),
        carController.index
    )
    .post(
        guards.apiGuards("customer"),
        carValidation.validate("create"),
        checkValidationError,
        carController.create
    )

router.get("/:id", 
    guards.apiGuards("customer", "picker"),
    carController.show
)


module.exports = router;