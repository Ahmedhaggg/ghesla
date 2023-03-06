let messages = require("../api/error/errors.messages");
let errorsTypes = require("../api/error/errors.types");

module.exports = (err, req, res, next) => {
    console.log(err)
    let defaultError = {
        success: false,
        message: messages.internalServerError,
        error: errorsTypes.INTERNAL_SERVER_ERROR
    }
    let errorFormat = err.success == false ? err : defaultError;
    
    res.status(err.httpStatusCode || 500).json({
        ...errorFormat
    })
}