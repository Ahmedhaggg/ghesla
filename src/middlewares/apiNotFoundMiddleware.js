const HttpStatusCode = require("../api/error/httpStatusCode")

module.exports = (req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    res.render("404", {
        title: "الصفحة غير موجودة"
    })
}