const BaseError = require("./base.error");

class APIError extends BaseError {
    constructor(name , httpStatusCode , description){
        super(name , httpStatusCode , description)
    }
}

module.exports = APIError;