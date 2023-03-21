const errorsMessages = require("../api/error/errors.messages");
const { db } = require("../config/database");
const { Gift, Customer } = require("../models");
let { decrementCustomerBalance, incrementCustomerBalance } = require("./balance.service")
let FactoryService = require("./factory.service");

exports.findByRecieverId = async (recieverId) => await Gift.findAll({
    where: { recieverId },
    attributes: ["id", "amount", "message"],
    include: { 
        required: true,
        model: Customer,
        where: { id: recieverId }
    }
});

exports.create = async (giftData, customerId) => {
    let transaction = await db.transaction();
    try {
        await Gift.create(giftData, { transaction });

        let decrementSenderBalance = await decrementCustomerBalance(giftData.senderId, giftData.amount, transaction);

        if (!decrementSenderBalance)
            throw new Error(errorsMessages.balanceIsNotSufficient);

        let incrementRecieverBalance = await incrementCustomerBalance(giftData.recieverId, giftData.amount, transaction);

        if (!incrementRecieverBalance)
            throw new Error(errorsMessages.internalServerError);

        await transaction.commit();
        return { success: true }
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        return { success: false, message: error.message};
    }        
}

exports.delete = async (query) => {
    let isDeleted = await Gift.destroy({ where: query });
    return isDeleted ? true : false;
}