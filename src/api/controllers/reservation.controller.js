let reservationService = require("../../services/reservation.service");
let FactoryController = require("./controllerFactory")
let expressAsyncHandler = require("express-async-handler")
exports.findAll = FactoryController.findOne(reservationService, 'reservation')
exports.create =   expressAsyncHandler(
    async (req, res, next) => {
        
    }
)