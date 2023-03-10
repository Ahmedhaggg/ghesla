let serviceService = require("../../services/service.service");
let PagesTitles = require("../messages/pages.title")
let DashboardErrorsMessages = require("../messages/dashboard.messages");
let uploader = require("../../middlewares/uploader")

exports.create = async (req, res, next) => {
    let validationErrors = req.flash("validationErrors");
    let createServiceError = req.flash("createServiceError")[0]
    let lastValues = req.flash("lastValues")[0];

    res.render("services/create", { 
        title: PagesTitles.CREATESERVICE,
        validationErrors,
        createServiceError,
        lastValues
    })
}

exports.store = async (req, res, next) => {
    let image = req.file.key;
    let { name, description, price, isAdditional, discount = null } = req.body;

    let newService = await serviceService.create({
        name, 
        description,
        price,
        isAdditional,
        image: image
    }, discount)
    
    if (!newService) {
        req.flash("createServiceError", DashboardErrorsMessages.createServiceError);
        req.flash("lastValues", req.body);
        await uploader.delete(image);
        return res.redirect("/dashboard/services/create")
    }

    res.redirect("/dashboard/services");
}
exports.edit = async (req, res, next) => {
    let validationErrors = req.flash("validationErrors");
    let updateServiceError = req.flash("updateServiceError")[0];
    let lastValues = req.flash("lastValues")[0]
    let { id } = req.params;
    
    let service = await serviceService.findOne({ id });

    res.render("services/edit", {
        title: PagesTitles.EDITSERVICE,
        validationErrors,
        updateServiceError,
        lastValues,
        service
    });
}

exports.update = async (req, res, next) => {
    let serviceData = req.body;
    let { id } = req.params;

    let updateService = await serviceService.update(id, serviceData)

    if (!updateService) {
        req.flash("updateServiceError", DashboardErrorsMessages.updateServiceError)
        return res.redirect(`/dashboard/services/${id}/edit`)
    }
    res.redirect(`/dashboard/services/${id}`)
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let service = await serviceService.findOne({ id });
    
    if (!service)
        return res.redirect("/dashboard/404")

    let discountValidationErrors = req.flash("validationErrors");
    let lastDiscountValues = req.flash("lastValues")[0]
    let deleteDiscountError = req.flash("deleteDiscountError")[0]
    let updateDiscountError = req.flash("updateDiscountError")[0]
    let createDiscountError = req.flash("createDiscountError")[0]
    console.log(lastDiscountValues)
    res.render("services/show", {
        title: service.name,
        service,
        lastDiscountValues,
        deleteDiscountError,
        updateDiscountError,
        createDiscountError,
        discountValidationErrors
    })
    
}


exports.index = async (req, res, next) => {
    let { isAdditional = false } = req.query;
    let services = await serviceService.findAll(isAdditional);
    
    res.render("services/index", {
        title: PagesTitles.SERVICES,
        services: services,
        isAdditional
    })
}


// exports.destroy = async (req, res, next) => {
//     let { id } = req.params;

//     let deleteService = await serviceService.delete()
// }