let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");
let serviceController = require("../controllers/service.admin.controller");
let serviceValidation = require("../../validations/service.validation")
let checkAdminValidationError = require("../../middlewares/adminCheckValidationError");
const uploader = require("../../middlewares/uploader");
router.get("/",
    // adminGuard,
    serviceValidation.validate("index"),
    catchErrors(serviceController.index)
);

router.get("/create",
    // adminGuard, 
    catchErrors(serviceController.create)
);

router.post("/store",
    // adminGuard, 
    uploader.upload("image"),
    serviceValidation.validate("create"),
    checkAdminValidationError,
    catchErrors(serviceController.store)
);

router.get("/:id", 
    // adminGuard,
    catchErrors(serviceController.show)
);

router.get("/:id/edit", 
    catchErrors(serviceController.edit)
);

router.put("/:id/update", 
    // adminGuard,
    serviceValidation.validate("update"),
    checkAdminValidationError,
    catchErrors(serviceController.update)
);

// router.delete("/:id/delete", 
//     adminGuard,
//     catchErrors(serviceController.destroy)
// );

module.exports = router;