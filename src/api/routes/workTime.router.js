let router = require("express").Router();
let workTimeController = require('../controllers/workTime.controller');
// let guards = require("../../middlewares/guards");

router.get("/days",
    // serviceController.apiGuards("customer"),
    workTimeController.index
);

router.get("/days/:id", 
    // guards.apiGuards("customer", "picker"),
    workTimeController.show
)


module.exports = router;