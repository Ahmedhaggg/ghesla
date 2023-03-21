let staffService = require("../../services/staff.service");
let pagesTitles = require("../messages/pages.title");
const hashing = require("../../utils/hashing");

exports.index = async (req, res, next) => {
    let staff = await staffService.findAll({ isAdmin: false })
    
    res.render("staff/index", {
        title: pagesTitles.STAFF,
        staff
    })
}

exports.create = async (req, res, next) => {
    let validationErrors = req.flash("validationErrors");
    let lastValues = req.flash("lastValues")[0];
    
    res.render("staff/create", { 
        title: pagesTitles.CREATESTAFF,
        validationErrors,
        lastValues
    })
}

exports.store = async (req, res, next) => {    
    let { password, name, phoneNumber, confirmPassword } = req.body;
    
    let newStaff = await staffService.create({
        password: hashedPassword,
        name,
        phoneNumber
    });

    if (newStaff.isFaild) {
        req.flash("validationErrors", newStaff.message);
        req.flash("lastValues", { password, name, phoneNumber, confirmPassword });
        return res.redirect(`/dashboard/staff/create`)
    }
    return res.redirect(`/dashboard/staff`);
}