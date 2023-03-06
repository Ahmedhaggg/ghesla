const { db } = require("../config/database");
let { WorkDay, WorkHour, Picker } = require("../models");
let FactoryService = require("./factory.service")

exports.countDays = async () => await WorkDay.count();

exports.createWorkDay = async (day) => {
    let transaction = await db.transaction();
    try {
        let numberOfPickers = await Picker.count({ transaction });

        let newDay = await WorkDay.create(day, { transaction });
        
        let hours = []
        for (let i = 9; i < 21; i += 2) {
            hours.push({
                hour: i,
                availablePlaces: numberOfPickers,
                workDayId: newDay.id
            })
        }
        await WorkHour.bulkCreate(hours, { transaction });
        
        await transaction.commit();
    } catch (error) {
        await transaction.rollback()
    }
}

exports.createWorkDayHours = async (hours) => await WorkHour.bulkCreate(hours);

exports.findAll = FactoryService.findAll(WorkDay);

exports.decrementHourPlace = async (id) => await WorkHour
    .increment({ availablePlaces: - 1 }, { where: { id} });

exports.findWorkDayHours = FactoryService.findOne(WorkDay, null, [{
        model: WorkHour,
        excludeAttribute: "workDayId"
    }] 
);

exports.findHour = FactoryService.findOne(WorkHour);


exports.saveCurrentWeekWorkTimes = async (days) => {
    let newTransaction = await db.transaction();
    try {
        let numberOfPickers = await Picker.count({ transaction: newTransaction });
        await Promise.all(days.map((day) => {
            if (day.isHoliday)
                return null;
            return WorkDay.create(day, { transaction: newTransaction })
                .then((newDay) => {
                
                    let hours = day.workHours.map(hour => ({ ...hour, availablePlaces: numberOfPickers, workDayId: newDay.id }));

                    return WorkHour.bulkCreate(hours, { transaction: newTransaction });
                });
        }));
        await newTransaction.commit();
    } catch(err) {
        await newTransaction.rollback()
    }
} 

