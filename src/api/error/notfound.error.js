const BaseError = require("./base.error");
const errorsMessages = require("./errors.messages");
const errorsTypes = require("./errors.types");
const HttpStatusCode = require("./httpStatusCode");

class NotFoundError extends BaseError {
    constructor(){
        super(errorsTypes.NOTFOUND , HttpStatusCode.NOT_FOUND , errorsMessages.notfound)
    }
}

module.exports = NotFoundError;