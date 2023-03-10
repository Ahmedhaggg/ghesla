let reservationService = require("../../services/reservation.service");
let serviceService = require("../../services/service.service");
let FactoryController = require("./controllerFactory")
let expressAsyncHandler = require("express-async-handler");
const { calcServicesTax, calcServiceTax } = require("../../utils/serviceTax");
const APIError = require("../error/api.error");
const InternalServerError = require("../error/internalServer.error");
const errorsTypes = require("../error/errors.types");
const HttpStatusCode = require("../error/httpStatusCode");
let uploader = require("../../middlewares/uploader");
const errorsMessages = require("../error/errors.messages");
exports.show = FactoryController.findOne(reservationService, 'reservation')

exports.create =   expressAsyncHandler(
    async (req, res, next) => {
        let customerId = req.customer.customerId;
        let { serviceId, location, workHourId, carId, additionalServicesIds = null } = req.body;
        let service = await serviceService.findOne({ id: serviceId });
        let amount = +service.dataValues.price;
        let tax = +calcServiceTax(service.dataValues.price);
        
        if (additionalServicesIds) {
            let additionalServices = await serviceService.findSomeServicesPrices(additionalServicesIds);
            amount += additionalServices.reduce((total, current) => total + (+current.dataValues.price), [0] )
            tax += +calcServicesTax(additionalServices); 
        }

        let newReservation = await reservationService.create(
            { 
                serviceId: service.id, 
                location, amount: amount + tax, 
                location, 
                customerId,
                carId,
                status: 1
            },
            workHourId,
            additionalServicesIds
        )
            
        if (newReservation.success === false)
            throw new APIError(errorsTypes.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, newReservation.message)

        res.status(HttpStatusCode.OK).json(newReservation);
    }
)

exports.index = FactoryController.findAllByCustomerId(reservationService, "reservations", "findByCustomerId");

exports.update = expressAsyncHandler(
    async (req, res, next) => {
        let { id } = req.params;
        let images = req.files.map(file => ({
            [file.fieldname]: file.key
        }));

        let reservationIsCompleted = await reservationService.completeReservation(id, images);

        if (!reservationIsCompleted) {
            await req.files.forEach(async file => {
                await uploader.delete(file.key)
            });

            throw new InternalServerError()
        }

        res.status(HttpStatusCode.OK).json({
            success: true
        })
    }
)