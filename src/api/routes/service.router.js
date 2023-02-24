let router = require("express").Router();
let serviceController =require('../controllers/service.controller');
let guards = require("../../middlewares/guards");
    // serviceController.apiGuards("customer"),

router.get("/",
    serviceController.index
);
    // guards.apiGuards("customer", "picker"),

router.get("/:id", 
    serviceController.show
)


module.exports = router;