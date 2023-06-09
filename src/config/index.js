let path = require("path");
let UPLOADPATH = path.join(path.dirname(__dirname), "adminDashboard", "public", "images");

const { 
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    BCRYPT_SALT,
    JWT_SECRET,
    AWS_S3_ACCESS_KEY, 
    AWS_S3_SECRET_KEY, 
    AWS_BUCKET,
    INFOBIP_API_KEY,
    INFOBIP_API_URL,
} = process.env;

module.exports = {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    BCRYPT_SALT,
    JWT_SECRET,
    UPLOADPATH,
    AWS_S3_ACCESS_KEY, 
    AWS_S3_SECRET_KEY, 
    AWS_BUCKET,
    INFOBIP_API_KEY,
    INFOBIP_API_URL,
};