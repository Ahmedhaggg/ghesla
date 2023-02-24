const APIError = require("../api/error/api.error");
const errorsMessages = require("../api/error/errors.messages");
const errorsTypes = require("../api/error/errors.types");
const HttpStatusCode = require("../api/error/httpStatusCode");
const { getDataFromJwtToken } = require("../utils/jwtTokens");
const expressAsyncHandler = require("express-async-handler");
exports.apiGuards = (...roles) => expressAsyncHandler(
    async (req, res, next) => {
        try {
            let token = req.headers['authorization'];
            let tokenData = await getDataFromJwtToken(token);
            
            if (!roles.includes(tokenData.role))
                throw new Error()
            
            req[tokenData.role] = tokenData;

            next();
        } catch (_) {
            throw new APIError(
                errorsTypes.UNAUTHORIZED, 
                HttpStatusCode.unauthorized, 
                errorsMessages.unauthorized
            )
        }   
    }
)

exports.adminGuard = async (req, res, next) => {
    try {
        if (!req.session.admin || !req.session.admin.isLogin)
            throw new Error()

        next();
    } catch (_) {
        res.redirect("/dashboard/login");
    }   
}