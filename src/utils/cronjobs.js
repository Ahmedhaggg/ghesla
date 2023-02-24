const cron = require('node-cron');
let { getNextSevenDaysDate, getFirstDayInNextWeek } = require("../utils/date.handler");
let workTime = require("../services/workTime.service");

exports.createWorkDays = async () => {
    let numberIfAvailableDays = await workTime.countDays();
    
    if (numberIfAvailableDays > 0)
        return;
    
    let weekDaysList = getNextSevenDaysDate();
    
    try {
        await workTime.saveCurrentWeekWorkTimes(weekDaysList);
    } catch (_) {
        console.log("error in add tasks")
    }
}
