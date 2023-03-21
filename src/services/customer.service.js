const { catchErrorOnCreate } = require("./errorsHandlers/database.error.handler");
const { Customer, CustomerLoginVerification, Reservation, Service, Car, ReservationStatus, City, Balance, Points } = require("../models");
let FactoryService = require("./factory.service");
const { db } = require("../config/database");
 
exports.count = FactoryService.count(Customer)
exports.findLoginData = FactoryService.findOne(Customer, ["id", "email", "password"], null);

exports.findCustomerProfileById = async (id) => await Customer.findOne({
    where: { id },
    attributes: { exclude: "password" },
    include: [
        { model: Balance, attributes: { exclude: "customerId" }},
        { model: Points, attributes: { exclude: "customerId" }}
    ]
})


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

exports.create = async customerData => {
    let transaction = await db.transaction();

    try {
        const customer = await Customer.create(customerData, { transaction });
      
        await Balance.create({
            customerId: customer.dataValues.id,
            balance: 0
        }, { transaction });

        await Points.create({
            customerId: customer.dataValues.id,
            points: 0
        }, { transaction });

        await transaction.commit();

        return true;
    } catch(error) {
        await transaction.rollback();
        return catchErrorOnCreate(error)
    }

}

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
