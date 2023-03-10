let workTimeService = require("../../services/workTime.service");
let FactoryController = require('./controllerFactory');

exports.index =  FactoryController.findAll(workTimeService, "worksDays");

exports.show = FactoryController.findOne(workTimeService, "workDay", "findWorkAvailableDayHours");