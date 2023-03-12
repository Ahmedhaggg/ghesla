let AWS = require("aws-sdk")
// let multerS3 = require("multer-s3") 
let multer = require("multer")
let { AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY, AWS_BUCKET } = require("../config")

const s3 = new AWS.S3({
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
    Bucket: AWS_BUCKET
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// const multerS3Config = multerS3({
//     s3: s3,
//     bucket: AWS_BUCKET,
//     metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// });

const storage = multer.memoryStorage();

exports.upload = (field) => multer({
    storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
}).single(field)

exports.uploadTwoFields = (fieldOne, fieldTwo) => multer({
    storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
}).fields([
    { name: fieldOne, maxCount: 1 },
    { name: fieldTwo, maxCount: 1}
])
// exports.uploadTwoFields = (fieldOne, fieldTwo) => multer({
//     storage: multerS3Config,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
//     }
// }).fields([
//     { name: fieldOne, maxCount: 1 },
//     { name: fieldTwo, maxCount: 1}
// ])

exports.saveUpload = async (key, buffer) => await s3.upload({
    Bucket: AWS_BUCKET,
    Key: key,
    Body: buffer,
}).promise();

exports.delete = async key => await s3.deleteObject({ Bucket: AWS_BUCKET, Key: key }).promise().then(() => {}).catch(() => {})