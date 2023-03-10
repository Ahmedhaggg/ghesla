const { Car, CarPlate } = require("../models")
let FactoryService = require("./factory.service");

exports.findAllByCustomerId = FactoryService.findOne(Car, { exclude: "customerId" });

exports.findAll = FactoryService.findAll(Car);

exports.findOne = FactoryService.findOne(Car, 
    { exclude: "customerId" }, {
    model: CarPlate,
    attributes: { exclude: "carId" },
})

exports.create = async (car, customerId) => {
    let newCar = await Car.create({ 
        model: car.model, 
        color: car.color,
        customerId
    });
    
    let plate = car.plate ? 
        await CarPlate.create({carId: newCar.id, ...car.plate })  : null;
        
    return { ...newCar.dataValues, plate}; 
}

