class BaseError extends Error {
    constructor(error , httpStatusCode , description){
        super(description);
        Object.setPrototypeOf(this , new.target.prototype)
        this.error = error;
        this.httpStatusCode = httpStatusCode;
        this.description = description;
        this.success = false;
        Error.captureStackTrace(this);
    }
}

module.exports = BaseError