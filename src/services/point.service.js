const { Points } = require("../models");

exports.findOne = async (customerId, transaction = null) => await Points.findOne({
    where: { customerId }, 
    raw: true, 
    transaction 
});
  

exports.decrement = async (customerId, points, transaction = null) => {
    let [[_, isDecremented]] = await Points.increment(
        { points: -points }, 
        { 
            where: { 
                customerId: customerId 
            }, 
            returning: true,
            transaction 
        }
    );
    return isDecremented ? true : false;
}

exports.increment = async (customerId, points, transaction = null) => {
    let [[_, isIncremented]] = await Points.increment(
        { points }, 
        { where: { customerId }, 
        transaction 
    })

    return isIncremented ? true : false;
}
