let FactoryController = require("./controllerFactory");
let cityService = require("../../services/city.service");
exports.index = FactoryController.findAll(cityService, "cities");