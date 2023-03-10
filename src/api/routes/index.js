let customerRoute = require("./customer.auth.router");
let carRouter = require("./car.router")
let serviceRouter = require("./service.router")
let workTimesRoutes = require("./workTime.router");
let reservationRoutes = require("./reservation.router");
let pickerAuthRoutes = require("./picker.auth.router");
let cityRoutes = require("./city.router");

const apiRoutes = (app) => {
    app.use("/api/v1/customers/auth", customerRoute);
    app.use("/api/v1/cars", carRouter);
    app.use("/api/v1/services", serviceRouter);
    app.use("/api/v1/work/", workTimesRoutes);
    app.use("/api/v1/reservations", reservationRoutes);
    app.use("/api/v1/pickers/auth", pickerAuthRoutes)
    app.use("/api/v1/cities", cityRoutes)
}

module.exports = apiRoutes;