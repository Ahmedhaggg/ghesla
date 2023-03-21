let reservationService = require("../../services/reservation.service");
let createReservationService = require("../../services/createReservation.service");
let serviceService = require("../../services/service.service");
let FactoryController = require("./controllerFactory")
let expressAsyncHandler = require("express-async-handler");
const { calcAdditionalServicesAmount, calcServiceAmount, calcGiftPoints} = require("../../utils/reservationCalc");
const APIError = require("../error/api.error");
const InternalServerError = require("../error/internalServer.error");
const errorsTypes = require("../error/errors.types");
const HttpStatusCode = require("../error/httpStatusCode");
let uploader = require("../../middlewares/uploader");
const { BALANCE, POINTS, RESERVATION_PENDING_ID, RESERVATION_DOING_ID } = require("../../config/constants");
const errorsMessages = require("../error/errors.messages");
exports.show = FactoryController.findOne(reservationService, 'reservation')

exports.create = async (req, res, next) => {
    const { paymentMethod } = req.body;
    
    if (paymentMethod === BALANCE) 
        return createReservationByBalance(req, res, next);
    else if (paymentMethod === POINTS) 
        return createReservationByPoints(req, res, next);
    else 
        throw new APIError(errorsTypes.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, errorsMessages.invalidPaymentMethod)
};

const createReservationByPoints = expressAsyncHandler(
    async (req, res, next) => {
        let customerId = req.customer.customerId;
        let { serviceId, location, workHourId, carId, additionalServicesIds = null } = req.body;
        let service = await serviceService.findServicePrice(serviceId);
        let points = calcServiceAmount(service, false);
        
        if (additionalServicesIds) {
            let additionalServices = await serviceService.findSomeServicesPrices(additionalServicesIds);
            points += calcAdditionalServicesAmount(additionalServices, false)
        }
        
        let newReservation = await createReservationService.createByPoints(
            { 
                location, 
                points: Math.round(points), 
                location, 
                customerId,
                carId,
                statusId: RESERVATION_PENDING_ID,
                paymentMethod: POINTS
            },
            workHourId,
            [...additionalServicesIds, serviceId]
        )
        if (newReservation.success === false)
            throw new APIError(errorsTypes.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, newReservation.message)
        
        res.status(HttpStatusCode.OK).json(newReservation);
    }
)

const createReservationByBalance = expressAsyncHandler(
    async (req, res, next) => {
        let customerId = req.customer.customerId;
        let { serviceId, location, workHourId, carId, additionalServicesIds = null } = req.body;
        let service = await serviceService.findServicePrice(serviceId);
        
        let amount = calcServiceAmount(service); 
        let amountWithoutTax = calcServiceAmount(service, false);
        
        if (additionalServicesIds) {
            let additionalServices = await serviceService.findSomeServicesPrices(additionalServicesIds);
            amount += calcAdditionalServicesAmount(additionalServices)
            amountWithoutTax += calcAdditionalServicesAmount(additionalServices, false)
        }
        
        let gitfPoints = calcGiftPoints(amountWithoutTax);
        
        let newReservation = await createReservationService.createByBalance(
            { 
                location, 
                amount, 
                location, 
                customerId,
                carId,
                statusId: RESERVATION_PENDING_ID,
                paymentMethod: BALANCE
            },
            workHourId,
            [...additionalServicesIds, serviceId],
            gitfPoints
        );
        
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
        console.log(req.picker)
        let { pickerId }  = req.picker;

        let reservations = await reservationService.findAll({ pickerId, statusId: [RESERVATION_DOING_ID, RESERVATION_PENDING_ID] });

        res.status(HttpStatusCode.OK).json({
            success: true,
            reservations
        })
    }
)

