const HttpStatusCode = require("../api/error/httpStatusCode")

module.exports = (req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: "end point not found"
    })
}