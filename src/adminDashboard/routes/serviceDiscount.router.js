let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");
let serviceDiscountController = require("../controllers/serviceDiscount.controller");
let serviceDiscountValidation = require("../../validations/serviceDiscount.validation")
let checkAdminValidationError = require("../../middlewares/adminCheckValidationError");

router.post("/:serviceId/discount/store",
    adminGuard,
    serviceDiscountValidation.validate("create"),
    checkAdminValidationError,
    catchErrors(serviceDiscountController.store)
);

router.put("/:serviceId/discount/:discountId",
    adminGuard, 
    serviceDiscountValidation.validate("update"),
    checkAdminValidationError,
    catchErrors(serviceDiscountController.update)
);

router.delete("/:serviceId/discount/:discountId",
    adminGuard, 
    catchErrors(serviceDiscountController.destroy)
);
module.exports = router;