const { Admin } = require("../models");
exports.count = async () => await Admin.count();
exports.create = async (newAdminData) => await Admin.create(newAdminData);

exports.findOne = async (email) => await Admin.findOne({ where: { email } });

