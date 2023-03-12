const { check } = require("express-validator");
const messages = require("../messages");
 
exports.isFile = field => (value, { req }) => {
    console.log(field)
    console.log(req.files[field])
    // console.log(req.files[1])
    if (req.file) {
        if (req.file?.fieldname == field)
            return true;
        throw new Error(messages.noFileUploaded)
    }
    else if (req.files) {
        let fileIsInFiles = req.files[field]
        if (fileIsInFiles)
            return true;
        throw new Error(messages.noFileUploaded)
    }
    else
        throw new Error(messages.noFileUploaded)
}