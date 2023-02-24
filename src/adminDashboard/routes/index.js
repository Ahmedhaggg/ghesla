let authRoutes = require("./auth.admin.router");
let indexRoutes = require("./index.admin.router");
let servicesRoutes = require("./services.admin.router");
let serviceDiscountRouter = require("./serviceDiscount.router")
exports.adminRoutes = app => {
    app.use("/dashboard", indexRoutes)
    app.use("/dashboard", authRoutes);
    app.use("/dashboard/services", serviceDiscountRouter);
    app.use("/dashboard/services", servicesRoutes);
    app.get("/dashboard/505", (req, res, next) => {
        res.render("505")
    })
    app.get("/dashboard/404", (req, res, next) => {
        res.render("404")
    })
}