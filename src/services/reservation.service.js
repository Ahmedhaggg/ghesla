let { Reservation, ReservationStatus, ReservationAdditionalService, WorkHour, Service, Customer, Picker, Car, ReservationCompletion } = require("../models");
let FactoryService = require("./factory.service");
let {db} = require("../config/database");
let messages = require("../api/error/errors.messages");
const APIError = require("../api/error/api.error");
const HttpStatusCode = require("../api/error/httpStatusCode");
exports.count = async (status = null) => await Reservation.count({
    include: {
        required: true,
        model: ReservationStatus,
        as: "status",
        where: status ? { name: status} : null
    }
});

// exports.findAll = FactoryService.findAll(Reservation, null, [{ model: Customer }, { model: ReservationStatus }] );
exports.findAll = async (status = null) => await Reservation.findAll({ 
    attributes: { exclude: ["statusId"]},
    include: [
        {
            model: Customer
        },
        { 
            required: true,
            as: "status",
            model: ReservationStatus,
            where: status ? { name: status }: {}
        },
        {
            model: Service,
            attributes: { include: "name" }
        }
    ]
})

exports.findByCustomerId = FactoryService.findAll(Reservation, { exclude: ["status"]}, [
    { model: ReservationStatus, attributes: ["name"], as: "status" },
    { required: true, model: Car },
    { required: true, model: Service }
])
exports.findOne = FactoryService.findOne(Reservation,
    null,
    [
        { required: true, model: Customer },
        { 
            required: true, 
            model: Service, 
            attributes: ["name", "image", "isAdditional"], 
            where: { isAdditional: false} 
        },
        { required: true, model: ReservationStatus, as: "status" },
        { required: true, model: Car },
        { model: Picker, attributes: { include: ["id", "name"]}}

    ]
);
exports.create = async (reservationData, workHourId, reservationAdditionalServices) => {
    const transaction = await db.transaction();
    try {
        const workHour = await WorkHour.findOne({ where: { id: workHourId }, raw: true });
        if (!workHour || !workHour.availablePlaces || workHour.date < new Date()) throw new APIError("notAvailableWorkPlaces", HttpStatusCode.BAD_REQUEST, messages.notAvailableHourWork);
        const newReservation = await Reservation.create({...reservationData, date: workHour.date }, { transaction });
        const newReservationAdditionalServices = reservationAdditionalServices
            ? await ReservationAdditionalService.bulkCreate(reservationAdditionalServices.map(additionalService => ({
                    ...additionalService, 
                    reservationId: newReservation.id 
                })), { transaction })
            : null;
        
        
        let updateAvailablePlacesInWorkHour = await WorkHour.increment({ availablePlaces: -1}, { where: { id: workHourId }, transaction })
        
        if (updateAvailablePlacesInWorkHour[0][1] !== 1) 
            throw new Error();
        
        await transaction.commit();
        return { 
            success: true,
            newReservation : { ...newReservation, newReservationAdditionalServices }
        };
    } catch(err) {
        let errorMessage = err.error === "notAvailableWorkPlaces" ? messages.notAvailableHourWork : messages.createReservationError
        await transaction.rollback();
        return { success: false, message: errorMessage }
    }
}
exports.addPickerToReservation = async (reservationId, pickerId) => {
    let transaction = await db.transaction();
    try {
        let reservationIsUpdated = await Reservation.update(
            { statusId: 2, pickerId }, 
            { 
                where: { id: reservationId }, 
                transaction 
            }
        );
        if (reservationIsUpdated[0] == 0)
            throw new Error();
        
        let pickerIsUpdated = await Picker.update({ isWorking: true }, { where: { id: pickerId }});

        if (pickerIsUpdated[0] == false)
            throw new Error();

        await transaction.commit();
        return true;
    } catch(error) {
        await transaction.rollback();
        return false;
    }
}

exports.completeReservation = async (reservationId, images) =>  {    
    let reservationIsCompleted = await Reservation.update({ status: 3}, { where: { id: reservationId } });
    if (reservationIsCompleted[0] !== 1)
        return false;

    await ReservationCompletion.create({
        ...images,
        reservationId
    });
    
    return true;
}