const { catchErrorOnCreate } = require("./errorsHandlers/database.error.handler");

exports.count = Model => async (query = {}) => await Model.count({ where: query });

exports.updateOne = Model => async (id, newData) => {
    let updatedItem = await Model.update(newData, { where: { id } });
    return updatedItem[0] === 1 ? true : false;
}

exports.deleteOne = Model => async (id) => {
    let updatedItem = await Model.destroy({ where: { id } });
    
    return updatedItem[0] === 1 ? true : false;
}

exports.create = Model => async (newData) =>  {
    try {
        return await Model.create(newData)
    } catch (error) {
        return catchErrorOnCreate(error)
    }
}
exports.findOne = (Model, attributes = null, include = null) => async query => await Model.findOne({
    where: query,
    attributes,
    include
})
exports.findAll = (Model, attributes = null, include = null) => async (query = {}, offset = null, limit = null) => 
    await Model.findAll({
        where: query,
        attributes,
        include: include,
        offset,
        limit
    })

