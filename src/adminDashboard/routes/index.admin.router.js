let router = require("express").Router();
const { catchErrors } = require("../../middlewares/adminCatchError");
const { adminGuard } = require("../../middlewares/guards");

let indexController = require("../controllers/index.admin.controller");


router.get("/",
    adminGuard,
    catchErrors(indexController.index)
);

module.exports = router;