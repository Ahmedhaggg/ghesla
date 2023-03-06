Date.prototype.addHours= function(h){
    this.setHours(this.getHours() + h);
    return this;
}

exports.addHoursToDate = (date, hours) => {
    let newDate = date.addHours(hours);

    return newDate;
}

exports.formatToDate = (year, month, day) => new Date(year, month - 1, day);


exports.getCurrentWeekDays = async () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(nextWeek.getTime() + i * 24 * 60 * 60 * 1000);
        const dayName = weekdays[currentDate.getDay()];
    
        // Exclude Fridays and mark them as holidays
        const isHoliday = dayName === 'Friday' ? true : false;
    
        const newDay = new Day({ name: dayName, date: currentDate, isHoliday });
        await newDay.save();
    }
}

const getDayHours = (dayDate) => {

    var x = 75; //minutes interval
    let hours = []; // time array
    var startTime = 9 * 60; // start time

    //loop to increment the time and push results in array
    for (var i=0; startTime< 21*60; i++) {
        let hour = Math.floor(startTime /60); // gestartTimeing hours of day in 0-24 format
        let minutes = (startTime % 60); // gestartTimeing minutes of the hour in 0-55 format
        let hourDate = new Date(dayDate)            
        hourDate.setHours(hour, minutes, 0)
        hours[i] = {hour: +`${hour}.${minutes}`, date: hourDate }        
        startTime = startTime + x;
    }
    return hours
}
exports.getNextWeekWorkTimes = () => {
    let days = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(nextDay);
        const isHoliday = dayName === 'Friday' ? true : false;
        let workHours = getDayHours(nextDay);
        days.push({ name: dayName, date: nextDay, isHoliday, workHours });
    }
    return days;
}
// exports.getNextSevenDaysDate = () => {
//     const today = new Date();
    
//     let days = [];

//     for (let i = 0; i < 7; i++) {
//         const currentDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
//         const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
    
//         // Exclude Fridays and mark them as holidays
//         const isHoliday = dayName === 'Friday' ? true : false;
    
//         days.push({ name: dayName, date: currentDate, isHoliday });
//     }
    
//     return days;
// };

exports.getFirstDayInNextWeek = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
    
    const currentDate = new Date(nextWeek.getTime() + 1 * 24 * 60 * 60 * 1000);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);

    // Exclude Fridays and mark them as holidays
    const isHoliday = dayName === 'Friday' ? null : false;

    return ({ name: dayName, date: currentDate, isHoliday });
};
