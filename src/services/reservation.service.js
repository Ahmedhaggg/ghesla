let { Reservation, ReservationTime, ReservationAdditionalService, WorkHour } = require("../models");
let FactoryService = require("./service.factory");
let {db} = require("../config/database");
let messages = require("../api/error/errors.messages")
exports.create = async (reservationData, reservationTime, reservationAdditionalServices) => {
    let transaction = await db.transaction();

    try {
        let workHour = await WorkHour.findOne({ where : { hour: reservationTime.hour, date: reservationTime.date }});
        if (workHour.availablePlaces == 0) 
            throw new Error({ type: "availablePlaces" });

        let newReservation= await Reservation.create(reservationData, { transaction });

        let newReservationTime = await ReservationTime.create({
            date: reservationTime.date,
            reservationId: newReservation.id            
        }, { transaction })

        if (!reservationAdditionalServices) {
            return {
                ...newReservation,
                reservationTime
            }
        }

        let newReservationAdditionalServicesData = reservationAdditionalServices.map(additionalService => ({
            ...additionalService,
            reservationId: newReservation.id
        }))

        let newReservationAdditionalServices = await ReservationAdditionalService.bulkCreate(newReservationAdditionalServicesData, { transaction })
        
        await transaction.commit();
        
        return {
            ...newReservation,
            reservationTime,
            newReservationAdditionalServices
        }
    } catch(err) {
        await transaction.rollback();

        if (err.type == "availablePlaces")
            return {
                success: false,
                message: messages.notAvailableHourWork
            }
        return null;
    }
}
