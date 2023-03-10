let router = require("express").Router();
let cityController =require('../controllers/city.controller');

router.get("/",
    cityController.index
);

module.exports = router;