const { Staff } = require("../models");
exports.count =  async () => await Staff.count({ where: { isAdmin: true }});
exports.create = async (adminData) => await Staff.create({ ...adminData, isAdmin: true });
exports.findOne = async (query) => await Staff.findOne({ ...query, isAdmin: true });;