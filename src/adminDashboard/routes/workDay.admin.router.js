let router = require("express").Router();
let workDayController = require("../controllers/workDays.admin.controller");
let { catchErrors }  = require("../../middlewares/adminCatchError");

router.get("/",
    // adminGuard,
    catchErrors(workDayController.index)
);

router.get("/:id",
    // adminGuard,
    catchErrors(workDayController.show)
);

module.exports = router;