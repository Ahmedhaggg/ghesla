const expressAsyncHandler = require("express-async-handler");
let balanceService = require("../../services/balance.service");
const httpstatusCode = require("../error/httpStatusCode")
let APIError = require("../error/api.error");
const errorsTypes = require("../error/errors.types");

exports.increment = expressAsyncHandler(
    async (req, res, next) =>  {
        let { phoneNumber, amount } = req.body;
        let { staffId } = req.staff;
        let newBalance = await balanceService.increment(phoneNumber, amount, staffId);
        
        if (!newBalance.success)
            throw new APIError(errorsTypes.BAD_REQUEST, httpstatusCode.BAD_REQUEST, newBalance.message)

        res.status(httpstatusCode.OK).json({
            success: true,
            newBalance: newBalance.newBalance
        })
    }
)
