const expressAsyncHandler = require("express-async-handler");
let customerService = require("../../services/customer.service");
const { addHoursToDate } = require("../../utils/date.handler");
const generateVerificationCode = require("../../utils/generateVerificationCode");
const { createJwtToken } = require("../../utils/jwtTokens");
const { sendSmsLoginVerificationCode } = require("../../utils/sendSmsNotification");
const APIError = require("../error/api.error");
const errorsMessages = require("../error/errors.messages");
const errorsTypes = require("../error/errors.types");
const HttpStatusCode = require("../error/httpStatusCode");

exports.login = expressAsyncHandler(
    async (req, res, next) => {
        let loginData = req.body;

        let customer = await customerService.findOne(loginData.phoneNumber);

        if (!customer)
            customer = await customerService.create({ 
                phoneNumber: loginData.phoneNumber,
                name: loginData.name 
            })

        
        let newRandomVerificatioCode = await generateVerificationCode();
        
        await customerService.createVerificationCode({
            customerId: customer.id,
            code: newRandomVerificatioCode,
            phoneNumber: loginData.phoneNumber,
            expiresin: addHoursToDate(new Date(), 1) 
        });

        // send verification code
        await sendSmsLoginVerificationCode(newRandomVerificatioCode, loginData.phoneNumber);

        res.status(HttpStatusCode.OK).json({
            success: true,
            newRandomVerificatioCode
        });
    }
)

exports.verify = expressAsyncHandler(
    async (req, res, next) => {
        let { phoneNumber, code } = req.body;
        
        let customerVerificationCode = await customerService.findVerificationCode(phoneNumber);
        
        if (!customerVerificationCode || customerVerificationCode.code !== code || customerVerificationCode.expiresin < new Date()) 
            throw new APIError(
                errorsTypes.BAD_REQUEST, 
                HttpStatusCode.BAD_REQUEST, 
                errorsMessages.invalidVerificationCode
            );
        await customerService.deleteVerificationCode(customerVerificationCode.id)

        let newAccessToken = await createJwtToken({
            role: "customer",
            customerId: customerVerificationCode.customerId
        });

        res.status(HttpStatusCode.OK).json({
            success: true, 
            newAccessToken
        })
    }
)