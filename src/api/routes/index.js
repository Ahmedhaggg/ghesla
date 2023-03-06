let customerRoute = require("./customer.auth.router");
let carRouter = require("./car.router")
let serviceRouter = require("./service.router")
let workTimesRoutes = require("./workTime.router");
let reservationRoutes = require("./reservation.router");

const apiRoutes = (app) => {
    app.use("/api/v1/customers/auth", customerRoute);
    app.use("/api/v1/cars", carRouter);
    app.use("/api/v1/services", serviceRouter);
    app.use("/api/v1/work/", workTimesRoutes);
    app.use("/api/v1/reservations", reservationRoutes);
}

module.exports = apiRoutes;