class BaseError extends Error {
    constructor(name , httpStatusCode , description){
        super(description);
        Object.setPrototypeOf(this , new.target.prototype)
        this.name = name;
        this.httpStatusCode = httpStatusCode;
        this.description = description;

        Error.captureStackTrace(this);
    }
}

module.exports = BaseError