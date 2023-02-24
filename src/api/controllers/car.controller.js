const expressAsyncHandler = require("express-async-handler");
let carService = require("../../services/car.service");
const httpstatusCode = require("../error/httpStatusCode")
const controllerFactory = require("./controllerFactory")

exports.create = expressAsyncHandler(
    async (req, res, next) =>  {
        let carData = req.body;
        let { customerId } = req.customer;

        let newCar = await carService.create(carData, customerId);
        res.status(httpstatusCode.OK).json({
            success: false,
            newCar
        })
    }
)

exports.index = controllerFactory.findAllByCustomerId(carService, "cars");

exports.show = controllerFactory.findOne(carService, "car")
