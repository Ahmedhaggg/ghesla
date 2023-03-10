let authRoutes = require("./auth.admin.router");
let indexRoutes = require("./index.admin.router");
let servicesRoutes = require("./services.admin.router");
let serviceDiscountRouter = require("./serviceDiscount.admin.router");
let pickerRoutes = require("./picker.admin.router"); 
let cityRoutes = require("./city.admin.router");
let reservationRoutes = require("./reservation.admin.router");
let customerRoutes = require("./customer.admin.router");
let workDayRoutes = require("./workDay.admin.router");

exports.adminRoutes = app => {
    app.use("/dashboard", indexRoutes)
    app.use("/dashboard", authRoutes);
    app.use("/dashboard/services", serviceDiscountRouter);
    app.use("/dashboard/services", servicesRoutes);
    app.use("/dashboard/pickers", pickerRoutes);
    app.use("/dashboard/customers", customerRoutes);
    app.use("/dashboard/reservations", reservationRoutes);
    app.use("/dashboard/cities", cityRoutes);
    app.use("/dashboard/work-days", workDayRoutes);
    
    app.get("/dashboard/505", (req, res, next) => {
        console.log("error")
        res.render("505")
    })
    app.get("/dashboard/404", (req, res, next) => {
        res.render("404")
    })
}