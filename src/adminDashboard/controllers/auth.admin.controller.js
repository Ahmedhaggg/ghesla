let adminService = require("../../services/admin.service");
const hashing = require("../../utils/hashing");
let dashboardMessages = require("../messages/dashboard.messages")
let PagesTitles = require("../messages/pages.title")
exports.showLogin = async (req, res, next) => {
    let validationErrors = req.flash("validationErrors");
    let loginError = req.flash("loginError")
    
    res.render("login", { 
        title: PagesTitles.LOGIN,
        loginError,
        validationErrors
    })
    // validationErrors: validationErrors.length == 0 ? null : validationErrors
}


exports.login = async (req, res, next) => {
    let { email, password } = req.body;
    let admin = await adminService.findOne({ email });

    if (!admin) {
        req.flash("message", dashboardMessages.invalidLogin)
        return res.redirect("/dashboard/login")
    }
    
    let isIncorrectPassword = await hashing.compare(password, admin.password);

    if (!isIncorrectPassword) {
        req.flash("message", dashboardMessages.invalidLogin)
        return res.redirect("/dashboard/login")
    }

    req.session.admin = {
        isLogin: true,
        id: admin.id
    }
    res.redirect("/dashboard/services");
}

// exports.register = async ()  => {
//     let password = await hashing.hash("Admin12345");
//     await adminService.create({ email: "admin@gmail.com", password })
// }