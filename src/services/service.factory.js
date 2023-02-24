
exports.updateOne = (Model) => async (id, newData) => {
    let updatedItem = await Model.update(newData, { where: { id } });
    return updatedItem[0] === 1 ? true : false;
}

exports.deleteOne = (Model) => async (id) => {
    let updatedItem = await Model.destroy({ where: { id } });
    
    return updatedItem[0] === 1 ? true : false;
}

exports.create = Model =>async (newData) => await Model.create(newData);

exports.findOne = (Model, includes = null) => async id => {
    console.log(includes)
    let includeList = includes ? includes.map(include => ({ 
        model: include.model, 
        attributes: include.exculde ? { exclude: include.exclude } : Object.keys(include.model.getAttributes())
    })) : [];  


    return await Model.findOne({
        where: { id },
        include: includeList
    })
}
let defaultFindAllOptions = {
    includes: null, 
    offset: null, 
    limit : null 
}
exports.findAll = (Model, options = defaultFindAllOptions) => async (query = {}) => {
    let includeList = options.includes ? options.includes.map(include => ({ 
        model: include.model, 
        attributes: include.excludeAttribute ? { exclude: include.excludeAttribute } : Object.keys(include.model.getAttributes())
    })) : null;

    return await Model.findAll({
        where: query,
        include: includeList,
        offset: options.offset,
        limit: options.limit
    })
}
