Date.prototype.addHours= function(h){
    this.setHours(this.getHours() + h);
    return this;
}

exports.addHoursToDate = (date, hours) => {
    let newDate = date.addHours(hours);

    return newDate;
}

exports.formatToDate = (year, month, day) => new Date(year, month - 1, day);

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

const daysMap = new Map([
    ["Sunday", "الأحد"],
    ["Monday", "الاثنين"],
    ["Tuesday", "الثلاثاء"],
    ["Wednesday", "الأربعاء"],
    ["Thursday", "الخميس"],
    ["Friday", "الجمعة"],
    ["Saturday", "السبت"]
]); 
  
exports.getNextWeekWorkTimes = () => {
    let days = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(nextDay);
        const isHoliday = dayName === 'Friday' ? true : false;
        let workHours = isHoliday ? null : getDayHours(nextDay);
        days.push({ name: daysMap.get(dayName), date: nextDay, isHoliday, workHours });
    }
    return days;
}
exports.getNextDayWorkTimes = (day) => {
    const nextDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(nextDay);
    const isHoliday = dayName === 'Friday' ? true : false;
    let workHours = isHoliday ? null : getDayHours(nextDay);
    return { name: daysMap.get(dayName), date: nextDay, isHoliday, workHours };
}