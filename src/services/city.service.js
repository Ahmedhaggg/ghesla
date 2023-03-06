let { City } = require("../models");
let FactoryService = require("./factory.service");

exports.create = FactoryService.create(City);

exports.findAll = FactoryService.findAll(City);