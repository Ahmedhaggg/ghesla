let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");
let reservationController = require("../controllers/reservation.controller");

router.get("/", 
    // adminGuard,
    catchErrors(reservationController.index)
);

router.get("/:id",
    // adminGuard,
    catchErrors(reservationController.show)
);

router.put("/:id", 
    // adminGuard,
    catchErrors(reservationController.update)
);

module.exports = router;