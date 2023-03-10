let router = require("express").Router();
let serviceController =require('../controllers/service.controller');
router.get("/",
    serviceController.index
);
router.get("/:id", 
    serviceController.show
)

module.exports = router;