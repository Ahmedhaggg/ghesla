let staffService = require("../../services/staff.service");
let expressAsyncHandler = require("express-async-handler");
const APIError = require("../error/api.error");
const errorsTypes = require("../error/errors.types");
const HttpStatusCode = require("../error/httpStatusCode");
const errorsMessages = require("../error/errors.messages");
const { createJwtToken } = require("../../utils/jwtTokens");
let hashing = require("../../utils/hashing");

exports.login =  expressAsyncHandler(
    async (req, res, next) => {
        let { phoneNumber, password } = req.body;
        let staff = await staffService.findOne({ phoneNumber, isAdmin: false });
       
        if (!staff) 
            throw new APIError(
                errorsTypes.BAD_REQUEST, 
                HttpStatusCode.BAD_REQUEST, 
                errorsMessages.invalidLogindata
            )
        
        
        let isIncorrectPassword = await hashing.compare(password, staff.dataValues.password);

        if (!isIncorrectPassword) 
            throw new APIError(
                errorsTypes.BAD_REQUEST, 
                HttpStatusCode.BAD_REQUEST, 
                errorsMessages.invalidLogindata
            )

        delete staff.dataValues.password;
        
        let newAccessToken = await createJwtToken({
            role: "staff",
            staffId:  staff.id
        });
        
        res.status(HttpStatusCode.OK).json({
            success: true, 
            newAccessToken,
            staff
        })
    }
)

