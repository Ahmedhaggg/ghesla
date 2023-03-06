let authRoutes = require("./auth.admin.router");
let indexRoutes = require("./index.admin.router");
let servicesRoutes = require("./services.admin.router");
let serviceDiscountRouter = require("./serviceDiscount.router");
let pickerRoutes = require("./picker.router"); 
let cityRoutes = require("./city.admin.router");
let reservationRoutes = require("./reservation.router");
let customerRoutes = require("./customer.admin.router");

exports.adminRoutes = app => {
    app.use("/dashboard", indexRoutes)
    app.use("/dashboard", authRoutes);
    app.use("/dashboard/services", serviceDiscountRouter);
    app.use("/dashboard/services", servicesRoutes);
    app.use("/dashboard/pickers", pickerRoutes);
    app.use("/dashboard/customers", customerRoutes);
    app.use("/dashboard/reservations", reservationRoutes);
    app.use("/dashboard/cities", cityRoutes);
    app.get("/dashboard/505", (req, res, next) => {
        res.render("505")
    })
    app.get("/dashboard/404", (req, res, next) => {
        res.render("404")
    })
}