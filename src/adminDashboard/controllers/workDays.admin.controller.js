let workTimeService = require("../../services/workTime.service");
let PagesTitles = require("../messages/pages.title");

exports.index = async (req, res, next) => {
    
    let workDays = await workTimeService.findAll();
    
    res.render("workDays/index", {
        title: PagesTitles.WORKDAYS,
        workDays
    })   
    
}

exports.show = async (req, res, next) => {
    let { id } = req.params;
    let workDay = await workTimeService.findWorkDayHours({ id });
    
    res.render("workDays/show", {
        title: workDay.dataValues.name,
        workDay
    })
}