let cityService = require("../../services/city.service");
let pagesTitles = require("../messages/pages.title");
let dashboardMessages = require("../messages/dashboard.messages")
exports.index = async (req, res, next) => {
    let cities = await cityService.findAll();

    res.render("cities/index", {
        title: pagesTitles.CITIES,
        cities
    });
}
exports.create = async (req, res, next) => {
    let validationErrors = req.flash("validationErrors");
    let createCityError = req.flash("createCityError")[0];
    let lastValues = req.flash("lastValues")[0];

    res.render("cities/create", {
        title: pagesTitles.CREATECITY,
        validationErrors,
        lastValues,
        createCityError
    })
}
exports.store = async (req, res, next) => {
    let { name } = req.body;

    let newCity = await cityService.create({ name });

    if (!newCity) {
        req.flash("lastValues", {name});
        req.flash("createCityError", dashboardMessages.createCityError);
        return res.redirect("/dashboard/cities/create")
    }
    
    res.redirect("/dashboard/cities")
}
