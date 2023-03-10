const { check } = require("express-validator");
const messages = require("../messages");
 
exports.isFile = field => (value, { req }) => {
    if (req.file) {
        if (req.file?.fieldname == field)
            return true;
        throw new Error(messages.noFileUploaded)
    }
    else if (req.files) {
        let fileIsInFiles = req.files.find(f => f.fieldname === field);
        if (fileIsInFiles)
            return true;
        throw new Error(messages.noFileUploaded)
    }
    else
        throw new Error(messages.noFileUploaded)
}