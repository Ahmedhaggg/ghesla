const Admin = require("./admin.mode");
const Car = require("./car.model");
const CarPlate = require("./carPlate.model");
const Customer = require("./customer.model");
const CustomerLoginVerification = require("./customerLoginVerification");
const Picker = require("./picker.model");
const Reservation = require("./reservation.model");
const ReservationAdditionalService = require("./reservationAdditionalService.model");
const ReservationStatus = require("./reservationStatus.model");
const Service = require("./service.model");
const ServiceDiscount = require("./serviceDiscount.model");
const WorkDay = require("./reservationDay")
const WorkHour = require("./reservationHour")
const City = require("./city.model");
// realtion between customer and loginverifcations ==>> customerId in customer table
Customer.hasOne(CustomerLoginVerification, { foreignKey: "customerId", onUpdate: "cascade", onDelete: "cascade" });
CustomerLoginVerification.belongsTo(Customer);

City.hasMany(Customer, { foreignKey: "cityId" })
Customer.belongsTo(City)
// realtion between customer and cars ==>> customerId in car table
Customer.hasMany(Car, { foreignKey: "customerId", onUpdate: "cascade", onDelete: "cascade" });
Car.belongsTo(Customer);

// realtion between car and plate ==>> carId in plate table
Car.hasOne(CarPlate, { foreignKey: "carId", onUpdate: "cascade", onDelete: "cascade" });
CarPlate.belongsTo(Car);

// realtion between reservation and ReservationStatus ==>> reservationId in ReservationStatus table
ReservationStatus.hasMany(Reservation, { foreignKey: "statusId"  })
Reservation.belongsTo(ReservationStatus, { foreignKey: "statusId", as: "status" });

// realtion between picker and reservation ==>> pickerId in reservation table
Picker.hasMany(Reservation, { foreignKey: "pickerId" })
Reservation.belongsTo(Picker)

// realtion between car and reservation ==>> carId in reservation table
Car.hasMany(Reservation, { foreignKey: "carId" })
Reservation.belongsTo(Car)

// realtion between customer and reservationTime ==>> customerId in reservation table
Customer.hasMany(Reservation, { foreignKey: "customerId" })
Reservation.belongsTo(Customer)

// relation between reservation and service
Service.hasMany(Reservation, { foreignKey: "serviceId" })
Reservation.belongsTo(Service);

// relation between service and discount
Service.hasOne(ServiceDiscount, { foreignKey: "serviceId" })
ServiceDiscount.belongsTo(Service)

// relation between reservation and reservation_additional_service 
// Reservation.hasMany(ReservationAdditionalService, { foreignKey: "reservationId"});
Reservation.belongsToMany(Service, { through: ReservationAdditionalService });
Service.belongsToMany(Reservation, { through: ReservationAdditionalService });

// Reservation.belongsToMany(Service, ReservationAdditionalService);

// relation between service and reservation_additional_service 


// realtion between reservationHour and ReservationDay
WorkDay.hasMany(WorkHour, { foreignKey: "workDayId", onDelete: 'cascade', hooks:true });
WorkHour.belongsTo(WorkDay)

module.exports = {
    Admin, 
    Customer,
    CustomerLoginVerification,
    Car,
    CarPlate,
    Reservation,
    ReservationStatus,
    Picker,
    Service,
    ServiceDiscount,
    ReservationAdditionalService,
    WorkDay,
    WorkHour,
    City
}