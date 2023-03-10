let { validationResult } = require("express-validator");
let APIError = require("../api/error/api.error")
let errorsMessages = require("../api/error/errors.messages")
let errorsTypes = require("../api/error/errors.types")
let httpStatusCode = require("../api/error/httpStatusCode")
let expressAsyncHandler = require("express-async-handler")
let uploader = require("./uploader")
let checkValidationError =  expressAsyncHandler(
    async (req, res, next) => {
        let validationResultArray = validationResult(req).array();
        if (validationResultArray.length === 0)
            return next();

        try {
            if (req.file)
                await uploader.delete(req.file.key);
                
            if (req.files) 
                await files.forEach(async file => {
                    await uploader.delete(file.key);
                });
    
            throw new APIError(errorsTypes.VALIDATION_ERROR, httpStatusCode.BAD_REQUEST, validationResultArray)
        } catch (error) {
            throw new APIError(errorsTypes.VALIDATION_ERROR, httpStatusCode.BAD_REQUEST, validationResultArray)
        }
    }
)

module.exports = checkValidationError;