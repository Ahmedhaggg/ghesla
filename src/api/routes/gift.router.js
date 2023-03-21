let router = require("express").Router();
let giftValidation = require("../../validations/gift.validation");
let giftController =require('../controllers/gift.controller');
let checkValidationError = require("../../middlewares/checkValidationError");
let guards = require("../../middlewares/guards");

router
    .route("/")
    .get(
        guards.apiGuards("customer"),
        giftController.index
    )
    .post(
        guards.apiGuards("customer"),
        giftValidation.validate("create"),
        checkValidationError,
        giftController.create
    );
router.delete("/:id", 
    guards.apiGuards("customer"),
    giftController.destroy
)

module.exports = router;