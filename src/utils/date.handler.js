Date.prototype.addHours= function(h){
    this.setHours(this.getHours() + h);
    return this;
}

exports.addHoursToDate = (date, hours) => {
    let newDate = date.addHours(hours);

    return newDate;
}



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

exports.getNextSevenDaysDate = () => {
    const today = new Date();
    
    let days = [];

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
    
        // Exclude Fridays and mark them as holidays
        const isHoliday = dayName === 'Friday' ? null : false;
    
        days.push({ name: dayName, date: currentDate, isHoliday });
    }
    
    return days;
};

exports.getFirstDayInNextWeek = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
    
    const currentDate = new Date(nextWeek.getTime() + 1 * 24 * 60 * 60 * 1000);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);

    // Exclude Fridays and mark them as holidays
    const isHoliday = dayName === 'Friday' ? null : false;

    return ({ name: dayName, date: currentDate, isHoliday });
};
