let messages = require("../api/error/errors.messages");
let errorsTypes = require("../api/error/errors.types");

module.exports = (err, req, res, next) => {
    console.log(err)
    let defaultError = {
        message: messages.internalServerError,
        error: errorsTypes.INTERNAL_SERVER_ERROR
    }
    res.status(err.httpStatusCode || 500).json({
        ...err || defaultError
    })
}