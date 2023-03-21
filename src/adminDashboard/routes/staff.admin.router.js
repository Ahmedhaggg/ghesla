let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");
let staffController = require("../controllers/staff.admin.controller");
let staffValidation = require("../../validations/staff.validation")
let checkAdminValidationError = require("../../middlewares/adminCheckValidationError");

router.route("/")
    .get(
        adminGuard,
        catchErrors(staffController.index)
    )
    .post(
        adminGuard,
        staffValidation.validate("create"),
        checkAdminValidationError,
        catchErrors(staffController.store)
    );

router.get("/create", 
    adminGuard,
    catchErrors(staffController.create)
);

module.exports = router;