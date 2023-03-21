const cron = require('node-cron');
let { getNextWeekWorkTimes, getNextDayWorkTimes } = require("../utils/date.handler");
let workTime = require("../services/workTime.service");

exports.createWorkDays = async () => {
    try {
        let numberIfAvailableDays = await workTime.countDays();
    
        if (numberIfAvailableDays > 0)
            return;
        
        let weekDaysList = getNextWeekWorkTimes();
        await workTime.saveCurrentWeekWorkTimes(weekDaysList);
    } catch (_) {}
}
 
// next job
// 1- get last day added from database
// 2- delete old day and it's hours from database
// 3- create date of the new day and it's hours
// 4- save the date in database
cron.schedule("0 0 * * *", async () => {
    try {
        let day = await workTime.getLatesttDay();
    
        await workTime.deleteOldestDay();

        let dayWorkTimes = getNextDayWorkTimes(day.dataValues.date);
        await workTime.saveNewDay(dayWorkTimes);
    } catch (error) {
        console.log(error)
    }
})