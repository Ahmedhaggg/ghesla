let reservationService = require("../../services/reservation.service");
let serviceService = require("../../services/service.service");
let FactoryController = require("./controllerFactory")
let expressAsyncHandler = require("express-async-handler");
const { calcServicesPrice, calcServicePrice} = require("../../utils/taxCalc");
const APIError = require("../error/api.error");
const InternalServerError = require("../error/internalServer.error");
const errorsTypes = require("../error/errors.types");
const HttpStatusCode = require("../error/httpStatusCode");
let uploader = require("../../middlewares/uploader");
exports.show = FactoryController.findOne(reservationService, 'reservation')

exports.create = expressAsyncHandler(
    async (req, res, next) => {
        let customerId = req.customer.customerId;
        let { serviceId, location, workHourId, carId, additionalServicesIds = null } = req.body;
        let service = await serviceService.findServicePrice(serviceId);
        let mainServiceAmount = calcServicePrice(service);
        
        let additionalServicesPrices = 0;
        if (additionalServicesIds) {
            let additionalServices = await serviceService.findSomeServicesPrices(additionalServicesIds);
            additionalServicesPrices = calcServicesPrice(additionalServices)
        }
        
        let newReservation = await reservationService.create(
            { 
                serviceId: service.id, 
                location, 
                amount: mainServiceAmount + additionalServicesPrices, 
                location, 
                customerId,
                carId,
                statusId: 1
            },
            workHourId,
            additionalServicesIds
        )
            
        if (newReservation.success === false)
            throw new APIError(errorsTypes.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, newReservation.message)

        res.status(HttpStatusCode.OK).json(newReservation);
    }
)

exports.index = FactoryController.findAllByCustomerId(reservationService, "reservations");

exports.update = expressAsyncHandler(
    async (req, res, next) => {
        let pickerId  = req.picker.pickerId;
        let { id } = req.params;
        let images = {
            after: req.files["after"][0].key,
            before: req.files["before"][0].key,
        }

        let reservationIsCompleted = await reservationService.completeReservation(id, images, pickerId);

        if (!reservationIsCompleted) {
            await uploader.delete(req.files["after"][0].key)
            await uploader.delete(req.files["before"][0].key)

            throw new InternalServerError()
        }

        res.status(HttpStatusCode.OK).json({
            success: true
        })
    }
)



exports.findPickerReservations = expressAsyncHandler(
    async (req, res, next) => {
        let pickerId  = req.params.id;
        let reservations = await reservationService.findAll({ pickerId, statusId: 2 });
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            reservations
        })
    }
)
