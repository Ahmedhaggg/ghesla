let customerRoute = require("./customer.auth.router");
let carRouter = require("./car.router")
let serviceRouter = require("./service.router")
let workTimesRoutes = require("./workTime.router");
let reservationRoutes = require("./reservation.router");
let pickerAuthRoutes = require("./pickerAuth.router");
let cityRoutes = require("./city.router");
let staffAuthRoutes = require("./staffAuth.router");
let balanceRoutes = require("./balance.router");
let pointsRoutes = require("./points.router");
let giftRoutes = require("./gift.router");

const apiRoutes = (app) => {
    app.use("/api/v1/customers/auth", customerRoute);
    app.use("/api/v1/cars", carRouter);
    app.use("/api/v1/services", serviceRouter);
    app.use("/api/v1/work/", workTimesRoutes);
    app.use("/api/v1/reservations", reservationRoutes);
    app.use("/api/v1/pickers", pickerAuthRoutes);
    app.use("/api/v1/cities", cityRoutes);
    app.use("/api/v1/staff", staffAuthRoutes);
    app.use("/api/v1/customers/balance", balanceRoutes);
    app.use("/api/v1/customers/points", pointsRoutes);
    app.use("/api/v1/gifts", giftRoutes);

}

module.exports = apiRoutes;