let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");
let cityController = require("../controllers/city.admin.controller");
let cityvalidation = require("../../validations/city.validation");
let checkAdminValidationError = require("../../middlewares/adminCheckValidationError");

router.get("/", 
    adminGuard,
    catchErrors(cityController.index)
);

router.get("/create", 
    adminGuard,
    catchErrors(cityController.create)
);

router.post("/", 
    adminGuard,
    cityvalidation.validate("create"),
    checkAdminValidationError,
    catchErrors(cityController.store)
);

module.exports = router;