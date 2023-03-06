let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");
let customerController = require("../controllers/customer.controller");
router.get("/",
    // adminGuard,
    catchErrors(customerController.index)
);
router.get("/:id",
    // adminGuard,
    catchErrors(customerController.show)
);

module.exports = router;