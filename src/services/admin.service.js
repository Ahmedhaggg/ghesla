const { Admin } = require("../models");
let FactoryService = require("./factory.service")
exports.count = FactoryService.count(Admin);
exports.create = FactoryService.create(Admin);
exports.findOne = FactoryService.findOne(Admin);

