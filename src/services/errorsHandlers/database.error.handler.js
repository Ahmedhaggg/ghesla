exports.catchErrorOnCreate = async error => {   
    if (error.name === "SequelizeUniqueConstraintError")
        return {
            isFaild: true,
            message: [{
                param: error.errors[0].path,
                msg: error.errors[0].message,
                location: "body"
            }]
        }
    else 
        throw new Error()
    
}

exports.catchIncrementError = error => {
    if (error.original.code === 'ER_DATA_OUT_OF_RANGE') 
        return {
            success: false,
            errorType: "valueIsOutOfRange"
        }
    else 
        return {
            success: false,
            errorType: "serverError"
        }
}