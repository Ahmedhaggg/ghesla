const { Car, CarPlate } = require("../models")
exports.findAllByCustomerId = async (customerId) =>
    await Car.findAll({ 
        where: {
            customerId
        },
        attributes: { exclude: "customerId" }
    });

exports.findAll = async (skip, limit) => await Car.findAll({
    limit,
    offset: skip
})

exports.findOne = async (id) => await Car.findOne({
    where: { id },
    attributes: { exclude: "customerId" },
    include: {
        model: CarPlate,
        attributes: { exclude: "carId" },
    }
})

exports.create = async (car, customerId) => {
    let newCar = await Car.create({ 
        model: car.model, 
        color: car.color,
        customerId
    });

    let plate = car.plate ? await CarPlate.create({
        carId: newCar.id,
        ...car.plate
    })  : null;
        
    return {
        ...newCar.dataValues,
        plate
    };
}

