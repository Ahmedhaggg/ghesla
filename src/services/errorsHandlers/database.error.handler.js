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