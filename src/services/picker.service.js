const { Op } = require("sequelize");
const { RESERVATION_PENDING } = require("../config/constants");
const { db } = require("../config/database");
let { Picker, Reservation, WorkDay, WorkHour, ReservationStatus } = require("../models");
let FactoryService = require("./factory.service");

exports.create = async (pickerData, startWorkTime) => {
    let transaction = await db.transaction();
    try {
        console.log(pickerData)
        let newPicker = await Picker.create(pickerData, { transaction });

        let workDays = await WorkDay.findAll({ 
            where: { date: { [Op.gte]: startWorkTime } }, 
            attributes:  ["id"],
            raw: true,
            transaction
        });

        let workDaysIds = workDays.map(day => day.id);

        await WorkHour.increment({ availablePlaces: 1}, { where: { workDayId: workDaysIds }, transaction })
        
        await transaction.commit();
        return newPicker;
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        return null;
    }
}
exports.findAll = async () => await Picker.findAll({
    attributes: { exclude: ["password"] }
 })
// exports.findAll = FactoryService.findAll(Picker, 
//     { exclude: ["email", "password"] },
//     [{ 
//         required: false,
//         model: Reservation,
//         where: { status: "doing" }
//     }]
// )

exports.findOne = FactoryService.findOne(Picker, 
    { exclude: ["password", "email"] },
    {
        model: Reservation,
        attributes: { include: ["id", "date", "amount"] },
        include: {
            model: ReservationStatus,
            as: "status"
        }
    }
);


exports.findLoginData = FactoryService.findOne(FactoryService, ["email", "password"]);