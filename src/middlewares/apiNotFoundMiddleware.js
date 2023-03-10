const HttpStatusCode = require("../api/error/httpStatusCode")

module.exports = (req, res, next) => {
    res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: "end point not found"
    })
}