const { db } = require("../config/database");
const { Service, ServiceDiscount } = require("../models");
let FactoryService = require("./factory.service");

exports.findOne = FactoryService.findOne(Service, null, [{
        model: ServiceDiscount,
        exclude: "servceId"
    }]);

exports.findAll = async (isAdditional = false, isUser = false) => await Service.findAll({
        where: { 
            isAdditional
        },
        attributes: { exclude: isUser ? "numberOfReservations"  : null },
        include: {
            required: false,
            model: ServiceDiscount,
            attributes: { exclude: "serviceId" }
        }
    })
exports.findSomeServicesPrices = async (ids) => Service.findAll({ 
    where: { id: ids },
    attributes: { include: "price" },
    raw: true
})

exports.create = async (serviceData, discountData) => {
    let newTransaction = await db.transaction();

    try {
        let newService = await Service.create(serviceData, { transaction: newTransaction });
        let discount = discountData ? await ServiceDiscount.create({
            ...discountData,
            serviceId:  newService.dataValues.id
        }, { transaction: newTransaction }): null;
        await newTransaction.commit()
       
        return {
            ...newService.dataValues,
            discount
        }
    } catch (error) {
        await newTransaction.rollback();
        return null;
    }
}

exports.update = FactoryService.updateOne(Service);

exports.delete = FactoryService.deleteOne(Service);

exports.updateDiscount = FactoryService.updateOne(ServiceDiscount)

exports.addDiscountToService = FactoryService.create(ServiceDiscount)

exports.deleteDiscount = FactoryService.deleteOne(ServiceDiscount);

exports.findDiscount = async () => await ServiceDiscount.findOne({ where:{id:  1}, raw: true });