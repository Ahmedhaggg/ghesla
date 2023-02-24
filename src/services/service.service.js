const { db } = require("../config/database");
const { Service, ServiceDiscount } = require("../models");
let ServiceFactory = require("./service.factory");

exports.findOne = ServiceFactory
    .findOne(Service, [{
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

    

exports.create = async (serviceData, discountData) => {
    let newTransaction = await  db.transaction();

    try {
        let newService = await Service.create(serviceData, { transaction: newTransaction });

        let discount = discountData ? ServiceDiscount.create({
            ...discountData,
            serviceId:  newService.id
        }, { transaction: newTransaction }): null;
        
        await newTransaction.commit()
        return {
            ...newService.dataValues,
            discount
        }
    } catch (_) {
        await transaction.rollback();
        return null;
    }
}

exports.update = ServiceFactory.updateOne(Service);

exports.delete = ServiceFactory.deleteOne(Service);

exports.updateDiscount = ServiceFactory.updateOne(ServiceDiscount)

exports.addDiscountToService = ServiceFactory.create(ServiceDiscount)

exports.deleteDiscount = ServiceFactory.deleteOne(ServiceDiscount);

exports.findDiscount = async () => await ServiceDiscount.findOne({ where:{id:  1}, raw: true });