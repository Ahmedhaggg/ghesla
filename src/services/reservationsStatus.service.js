const ReservationStatus = require("../models/reservationStatus.model");

exports.findAll = async () => await ReservationStatus.findAll();

exports.count = async () => await ReservationStatus.count();
exports.create = async (data) => await ReservationStatus.create(data);
exports.delete = async () => ReservationStatus.destroy();
