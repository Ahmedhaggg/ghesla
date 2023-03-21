const expressAsyncHandler = require("express-async-handler");
let giftService = require("../../services/gift.service");
let customerService = require("../../services/customer.service");
const httpstatusCode = require("../error/httpStatusCode")
const APIError = require("../error/api.error");
const errorsTypes = require("../error/errors.types");
const errorsMessages = require("../error/errors.messages");

exports.create = expressAsyncHandler(
    async (req, res, next) => {
        let { customerId } = req.customer;
        let { recieverPhoneNumber, amount, message } = req.body;
        
        let reciever = await customerService.findLoginData({ phoneNumber: recieverPhoneNumber });
 
        if (!reciever || reciever.dataValues.id == customerId)
            throw new APIError(errorsTypes.BAD_REQUEST, httpstatusCode.BAD_REQUEST, errorsMessages.incorrectRecieverPhoneNumber)
        
        let newGift = await giftService.create({
            amount, 
            message,
            recieverId: reciever.dataValues.id,
            senderId: customerId
        });

        if (!newGift.success)
            throw new APIError(errorsTypes.BAD_REQUEST, httpstatusCode.BAD_REQUEST, errorsMessages.message);

        res.status(httpstatusCode.OK).json({
            success: true,
            newBalance: newGift.senderNewBalnce
        })
    }
)

exports.index = expressAsyncHandler(
    async (req, res, next) => {
        let { customerId } = req.customer;
        let gifts = await giftService.findByRecieverId(customerId);

        res.status(httpstatusCode.OK).json({ success: true, gifts })
    }
)

exports.destroy = expressAsyncHandler(
    async (req, res, next) => {
        let { customerId } = req.customer;
        let { id } = req.params;
        
        let deletedGift = await giftService.delete({ id, recieverId: customerId });

        if (!deletedGift) 
            throw new APIError(errorsTypes.BAD_REQUEST, httpstatusCode.BAD_REQUEST, errorsMessages.failedDelete)
        
        res.status(httpstatusCode.OK).json({ success: true })
    }
)