let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");
let pickerController = require("../controllers/picker.admin.controller");
let pickerValidation = require("../../validations/picker.validation")
let checkAdminValidationError = require("../../middlewares/adminCheckValidationError");
let uploader = require("../../middlewares/uploader")
router.route("/")
    .get(
        adminGuard,
        catchErrors(pickerController.index)
    )
    .post(
        adminGuard,
        uploader.saveUploadInMemory("image"),
        pickerValidation.validate("create"),
        checkAdminValidationError,
        catchErrors(pickerController.store)
    );

router.get("/create", 
    adminGuard,
    catchErrors(pickerController.create)
);

router.get("/:id",
    adminGuard,
    catchErrors(pickerController.show)
)

// router.route("/:id")
//     .get(
//         // adminGuard,
//         pickerController.show
//     )
//     .put(
//         // adminGuard,
//         pickerValidation.validate("update"),
//         checkAdminValidationError,
//         catchErrors(pickerController.update)
//     )

// router.get("/:id/edit", 
//     // adminGuard,
//     catchErrors(pickerController.edit)
// );

module.exports = router;