const expressAsyncHandler = require("express-async-handler");
let pointsService = require("../../services/point.service");
let customerService = require("../../services/customer.service")
const httpstatusCode = require("../error/httpStatusCode")
let APIError = require("../error/api.error");
const errorsTypes = require("../error/errors.types");
const errorsMessages = require("../error/errors.messages");
const InternalServerError = require("../error/internalServer.error");
exports.increment = expressAsyncHandler(
    async (req, res, next) =>  {
        let { phoneNumber, points } = req.body;
        let customer = await customerService.findLoginData({ phoneNumber });
        
        if (!customer)
            throw new APIError(errorsTypes.BAD_REQUEST, httpstatusCode.BAD_REQUEST, errorsMessages.incorrectCustomerPhoneNumber);

        
        let pointsIsUpdated = await pointsService.increment(customer.dataValues.id, points);
        
        if (!pointsIsUpdated)
            throw new InternalServerError();

        res.status(httpstatusCode.OK).json({
            success: true
        })
    }
)