let pickerService = require("../../services/picker.service");
let FactoryController = require("./controllerFactory")
let expressAsyncHandler = require("express-async-handler");
const APIError = require("../error/api.error");
const errorsTypes = require("../error/errors.types");
const HttpStatusCode = require("../error/httpStatusCode");
const errorsMessages = require("../error/errors.messages");
const { createJwtToken } = require("../../utils/jwtTokens");
let hashing = require("../../utils/hashing");

exports.login =  expressAsyncHandler(
    async (req, res, next) => {
        let { email, password } = req.body;
        let picker = await pickerService.findLoginData({ email });
       
        if (!picker) 
            throw new APIError(
                errorsTypes.BAD_REQUEST, 
                HttpStatusCode.BAD_REQUEST, 
                errorsMessages.emailIsNotUsed
            )
        
        
        let isIncorrectPassword = await hashing.compare(password, picker.dataValues.password);

        if (!isIncorrectPassword) 
            throw new APIError(
                errorsTypes.BAD_REQUEST, 
                HttpStatusCode.BAD_REQUEST, 
                errorsMessages.passwordIsIncorrect
            )

        delete picker.dataValues.password;
        
        let newAccessToken = await createJwtToken({
            role: "picker",
            pickerId:  picker.id
        });
        
        res.status(HttpStatusCode.OK).json({
            success: true, 
            newAccessToken
        })
    }
)