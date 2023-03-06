let { validationResult } = require("express-validator");
let uploader = require("../middlewares/uploader")
let adminCheckValidationError = async (req, res, next) => {
    try {
        let validationResultArray = validationResult(req).array();
        console.log("body", validationResultArray)
        if (validationResultArray.length === 0)
            return next();
        
        
        if (req.file) {
            await uploader.delete(req.file.key)
        }
        req.flash("validationErrors", validationResultArray);
        req.flash("lastValues", req.body)

        let backURL = req.header('Referer').split("http://localhost")[1] || '/';

        res.redirect(backURL);
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
}

module.exports = adminCheckValidationError;