const { catchErrorOnCreate } = require("./errorsHandlers/database.error.handler");
const { Customer, CustomerLoginVerification, Reservation, Service, Car, ReservationStatus, City } = require("../models");
let FactoryService = require("./factory.service");
exports.count = FactoryService.count(Customer)
exports.findLoginData = FactoryService.findOne(Customer, ["id", "email", "password"], null);

exports.findOne = FactoryService.findOne(Customer, null, [
    {
        required: false,
        model: Reservation,
        include: [
            {
                required: false,
                model: Service
                // where: { isAdditional: false }
            },
            {
                required: true,
                as: "status",
                model: ReservationStatus,
            },
            { 
                model: Car,
                required: true
            }
        ]
    },
    { 
        model: City,
        required: true
    }
]);

exports.create = FactoryService.create(Customer)

exports.createVerificationCode = async (newVerificationCodeData) => {
    let verificationCode = await CustomerLoginVerification
        .update(newVerificationCodeData, {
            where: { phoneNumber: newVerificationCodeData.phoneNumber }
        });
        
    return verificationCode[0] == 1 ? newVerificationCodeData : await CustomerLoginVerification.create(newVerificationCodeData);
}
exports.findVerificationCode = FactoryService.findOne(CustomerLoginVerification);

exports.deleteVerificationCode = FactoryService.deleteOne(CustomerLoginVerification);

exports.findAll = FactoryService.findAll(Customer, null, { model: City})
