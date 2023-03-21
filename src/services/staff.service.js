const { Staff } = require("../models");
let FactoryService = require("./factory.service");

exports.create = FactoryService.create(Staff);

exports.findAll = FactoryService.findAll(Staff, { exclude: ["password", "id"]})

exports.findOne = FactoryService.findOne(Staff, ["phoneNumber", "password", "name"])

