let { Reservation, ReservationStatus, ReservationService, WorkHour, Service, Customer, Picker, Car, ReservationCompletion, Balance } = require("../models");
let FactoryService = require("./factory.service");
let {db} = require("../config/database");
const { RESERVATION_COMPLETED_ID } = require("../config/constants");
exports.count = async (status = null) => await Reservation.count({
    include: {
        required: true,
        model: ReservationStatus,
        as: "status",
        where: status ? { name: status} : null
    }
});
 
exports.findByStatusName = async (status = null, offset = 0, limit= 10) => await Reservation.findAll({ 
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
            attributes: ["id", "name"],
            where: { isAdditional: false }
        }
    ],
    offset,
    limit,
    order: [["date", "ASC"]]
})
exports.findAll = FactoryService.findAll(Reservation, { exclude: ["statusId"]}, [
    { model: ReservationStatus, attributes: ["name"], as: "status" },
    { required: true, model: Car },
    { 
        model: Service, 
        attributes: ["id", "name", "image", "isAdditional"], 
    }
])


exports.findOne = FactoryService.findOne(Reservation,
    null,
    [
        { required: true, model: Customer },
        { 
            model: Service, 
            attributes: ["id", "name", "image", "isAdditional"], 
        },
        { required: true, model: ReservationStatus, as: "status" },
        { required: true, model: Car },
        { model: Picker, attributes: { include: ["id", "name"]}},
        { model: ReservationCompletion, attributes: { exclude: ["id"] }, as: "images"}
    ]
);

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
        
        let pickerIsUpdated = await Picker.update({ isWorking: true }, { where: { id: pickerId }, transaction });
        
        if (pickerIsUpdated[0] !== 1)
            throw new Error();

        await transaction.commit();
        return true;
    } catch(error) {
        console.log(error)
        await transaction.rollback();
        return false;
    }
}

exports.completeReservation = async (reservationId, images, pickerId) =>  {    
    let transaction = await db.transaction();
    try {
        let reservationIsCompleted = await Reservation.update(
            { statusId: RESERVATION_COMPLETED_ID}, 
            { where: { id: reservationId }, transaction }
        );
        
        if (reservationIsCompleted[0] !== 1)
            throw new Error();

        await ReservationCompletion.create({
            ...images,
            reservationId
        }, { transaction });
        
        let pickerIsUpdated = await Picker.update({ isWorking: false }, { where: { id: pickerId }, transaction });
        
        if (pickerIsUpdated[0] !== 1)
            throw new Error();
        await transaction.commit();

        return true;
    } catch (err) {
        console.log(err)
        await transaction.rollback();
        return false;
    }
}