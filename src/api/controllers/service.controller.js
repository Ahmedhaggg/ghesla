const expressAsyncHandler = require("express-async-handler");
let serviceService = require("../../services/service.service");
const HttpStatusCode = require("../error/httpStatusCode");
const controllerFactory = require("./controllerFactory")

exports.index = expressAsyncHandler( async (req, res, next) => {
    let services = await serviceService.findAll(false, true)
    let additionalServices = await serviceService.findAll(true, true)

    res.status(HttpStatusCode.OK).json({
        success: true,
        services,
        additionalServices
    })
})

exports.show = controllerFactory.findOne(serviceService, "service")
