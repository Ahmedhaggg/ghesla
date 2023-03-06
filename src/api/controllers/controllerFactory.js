let expressAsyncHandler = require("express-async-handler");
const httpStatusCode = require("../error/httpStatusCode");
let NotFoundError = require("../error/notfound.error")

exports.findOne = (service, responseName, method = null) =>  
    expressAsyncHandler(
        async (req, res, next) => {
            let { id } = req.params;

            // object to display data
            let data = {};
            data[responseName] = method ? await service[method]({ id }) : await service.findOne({ id });
            
            // check if not found
            if (data[responseName] == null) 
                throw new NotFoundError()

            res.status(httpStatusCode.OK).json({
                success: true,
                ...data
            })
        }
    )


exports.findAll = (service, responseName, method = null) =>  
    expressAsyncHandler(
        async (req, res, next) => {
            let data = {};
            data[responseName] = method ? service[method]() : await service.findAll(req.query);
            
            res.status(httpStatusCode.OK).json({
                success: true,
                ...data
            })
        }
    )

exports.findAllByCustomerId = (service, responseName, method = null) =>  
    expressAsyncHandler(
        async (req, res, next) => {
            let { customerId } = req.customer;
            
            let data = {};
            data[responseName] = method ? await service[method]({ customerId }) : await service.findAll({ customerId  });
            
            res.status(httpStatusCode.OK).json({
                success: true,
                ...data
            })
        }
    )



    // exports.findOneByCustomerId = (serviceName, responseName) =>  
//     expressAsyncHandler(
//         async (req, res, next) => {
//             let { id } = req.params;
//             let customerId = req.customerId.id

//             let data;
//             data[responseName] = await serviceName.findOne(id);
            
//             res.status(httpStatusCode.OK).json({
//                 success: true,
//                 ...data
//             })
//         }
//     )


// exports.create = (service, responseName, customerId) => 
//     expressAsyncHandler(
//         async (req, res, next) =>  {
//             let body = req.body;
//             let data;
//             data[responseName] = await service.create(body);
//             res.status(httpstatusCode.OK).json({
//                 success: false,
//                 ...data
//             })
//         }
//     )