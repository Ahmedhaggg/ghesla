const expressAsyncHandler = require("express-async-handler");
let customerService = require("../../services/customer.service");
const { addHoursToDate, formatToDate } = require("../../utils/date.handler");
const generateVerificationCode = require("../../utils/generateVerificationCode");
const { createJwtToken } = require("../../utils/jwtTokens");
const { sendSmsLoginVerificationCode } = require("../../utils/sendSmsNotification");
const APIError = require("../error/api.error");
const errorsMessages = require("../error/errors.messages");
const errorsTypes = require("../error/errors.types");
const HttpStatusCode = require("../error/httpStatusCode");
let hashing = require("../../utils/hashing");
// exports.login = expressAsyncHandler(
//     async (req, res, next) => {
//         let loginData = req.body;

//         let customer = await customerService.findOne({ phoneNumber: loginData.phoneNumber });

//         if (!customer)
//             customer = await customerService.create({ 
//                 phoneNumber: loginData.phoneNumber,
//                 name: loginData.name 
//             })

        
//         let newRandomVerificatioCode = await generateVerificationCode();
        
//         await customerService.createVerificationCode({
//             customerId: customer.id,
//             code: newRandomVerificatioCode,
//             phoneNumber: loginData.phoneNumber,
//             expiresin: addHoursToDate(new Date(), 1) 
//         });

//         // send verification code
//         await sendSmsLoginVerificationCode(newRandomVerificatioCode, loginData.phoneNumber);

//         res.status(HttpStatusCode.OK).json({
//             success: true,
//             newRandomVerificatioCode
//         });
//     }
// )

exports.verify = expressAsyncHandler(
    async (req, res, next) => {
        let { phoneNumber, code } = req.body;
        
        let customerVerificationCode = await customerService.findVerificationCode({ phoneNumber });
        
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
exports.register = expressAsyncHandler(
    async (req, res, next) => {
        let { email, password, name, phoneNumber, birthDay : {year, month, day}, cityId, gender } = req.body;

        password = await hashing.hash(password);

        let birthDayDate = formatToDate(year, month, day);
        
        let newCustomer = await customerService.create({
            email, 
            password,
            name,
            birthDay: birthDayDate,
            phoneNumber, 
            cityId,
            gender
        });

        if (newCustomer.isFaild)
            throw new APIError(errorsTypes.VALIDATION_ERROR, HttpStatusCode.BAD_REQUEST, newCustomer.message)

        res.status(HttpStatusCode.OK).json({
            success: true
        })
    }
)
exports.login = expressAsyncHandler(
    async (req, res, next) => {
        let loginData = req.body;
        
        let customer = await customerService.findLoginData({ phoneNumber: loginData.phoneNumber });
    
        if (!customer)
            throw new APIError(
                errorsTypes.BAD_REQUEST, 
                HttpStatusCode.BAD_REQUEST, 
                errorsMessages.phoneNumberNotUsed
            )

        
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

exports.profile = expressAsyncHandler(
    async (req, res, next) => {
        let { customerId } = req.customer;

        let profile = await customerService.findCustomerProfileById(customerId);

        if (!profile)
            throw new APIError(errorsTypes.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, errorsMessages.notfound);
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            profile
        })
    }
)