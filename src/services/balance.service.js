const { Op } = require("sequelize");
const errorsMessages = require("../api/error/errors.messages");
const InternalServerError = require("../api/error/internalServer.error");
const { db } = require("../config/database");
const { Balance, BalanceTransaction, Customer, Staff } = require("../models");
let FactoryService = require("./factory.service")
exports.increment = async (userPhoneNumber, amount, staffId) => {
    let transaction = await db.transaction();
    try {
        let customer = await Customer.findOne({ 
            where: { phoneNumber: userPhoneNumber }, 
            attributes: { include: "id"}, 
            transaction
        });

        if (!customer) {
            await transaction.rollback()
            return { 
                success: false,
                message: errorsMessages.incorrectCustomerPhoneNumber
            };
        }

        let [[_, updatedBalance]] = await Balance.increment({ balance: amount }, { where: { customerId: customer.dataValues.id } , transaction })
        if (!updatedBalance)
            throw new Error();

        await BalanceTransaction.create({ customerId: customer.dataValues.id, staffId, amount, transaction })

        await transaction.commit();
        return { 
            success: true
        }
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        throw new InternalServerError();
    }
}

exports.findCustomerTransactions = FactoryService.findOne(BalanceTransaction, 
    { include: ["id", "balance"]},
    { include: {
        model: Staff,
        attributes: ["id", "phoneNumber", "name"] 
    }}    
);

exports.findTransactionsByDate = async (startAt, endAt) => await BalanceTransaction.findAll(
    { 
        where: { 
            createdAt: { 
                [Op.between]: [startAt, endAt]
            }
        },
        include: [
            {
                model: Customer,
                attributes: { include: ["id", "name", "phoneNumber"]}
            },
            {
                model: Staff,
                attributes: { exclude: ["password"]}
            }
        ]

    }
)

exports.decrementCustomerBalance = async (customerId, amount, transaction = null) => {
    try {
        let [[_, isDecremented]] = await Balance.increment(
            { balance: -amount }, 
            { 
                where: { 
                    customerId: customerId 
                }, 
                transaction 
            }
        );

        return isDecremented ? true : false ;
    } catch (_) {
        return false;
    }
}

exports.incrementCustomerBalance = async (customerId, amount, transaction = null) => {
    try {
        let [[_, isDecremented]] = await Balance.increment(
            { balance: amount }, 
            { 
                where: { 
                    customerId: customerId 
                }, 
                transaction 
            }
        );

        return isDecremented ? true : false;
    } catch (_) {
        return false;
    }
}

exports.findOne = async (customerId, transaction) => await Balance.findOne({
    where: { customerId },
    attributes: ["id", "balance"],
    raw: true,
    transaction
})