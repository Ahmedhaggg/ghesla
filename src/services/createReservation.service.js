let messages = require("../api/error/errors.messages");
const { Balance, Reservation, ReservationService, WorkHour } = require("../models");
const { db } = require("../config/database");
let { calcNewBalance } = require("../utils/reservationCalc");
let balanceService = require("./balance.service")
let pointsService = require("./point.service")


exports.createByBalance = async (reservationData, workHourId, reservationServices, giftPoints) => {
    const transaction = await db.transaction();
    
    try {

        let balance = await balanceService.findOne(reservationData.customerId, transaction);
        if (!balance || balance.balance < reservationData.balance)
            throw new Error(messages.balanceIsNotSufficient)        
        
        const decrementedBalance = await balanceService.decrementCustomerBalance(reservationData.customerId, reservationData.amount, transaction);
        if (!decrementedBalance) 
            throw new Error(messages.balanceIsNotSufficient);

        const updatedPoints = await pointsService.increment(reservationData.customerId, giftPoints, transaction);
        if (!updatedPoints)
            throw new Error(messages.internalServerError);

        const workHour = await getWorkHour(workHourId, transaction);
        if (!workHour || !workHour.availablePlaces || workHour.date < new Date()) 
            throw new Error(messages.notAvailableHourWork);
    
        const updateWorkHour = await decrementAvailablePlaces(workHourId, transaction);
        if (!updateWorkHour) 
            throw new Error(messages.notAvailableHourWork);
    
        const newReservation = await createReservation(reservationData, workHour.date, transaction);
    
        const newReservationServices = await createReservationServices(reservationServices, newReservation.id, transaction);

        await transaction.commit();

        return { 
            success: true,
            newReservation: { ...newReservation.dataValues, newReservationServices },
            balance: +balance.balance,
            newBalance: calcNewBalance(balance.balance, reservationData.amount),
            giftPoints
        };
    } catch (err) {
        console.log(err)
        await transaction.rollback();
        return { success: false, message: err.message };
    }
}

exports.createByPoints = async (reservationData, workHourId, reservationServices) => {
    const transaction = await db.transaction();
    try {
        let points = await pointsService.findOne(reservationData.customerId, transaction);
        if (!points || points.points < reservationData.points)
            throw new Error(messages.pointsIsNotEnough)
        
        const decrementedPoints = await pointsService.decrement(reservationData.customerId, reservationData.points, transaction);
        if (!decrementedPoints) 
            throw new Error(messages.internalServerError);

        const workHour = await getWorkHour(workHourId, transaction);

        if (!workHour || !workHour.availablePlaces || workHour.date < new Date()) 
            throw new Error(messages.notAvailableHourWork);
    
        const updateHour = await decrementAvailablePlaces(workHourId, transaction);
        if (!updateHour) 
            throw new Error(messages.notAvailableHourWork);
    
        const newReservation = await createReservation(reservationData, workHour.date, transaction);
    
        const newReservationServices = await createReservationServices(reservationServices, newReservation.id, transaction);
    
        await transaction.commit();
    
        return { 
            success: true,
            newReservation: { ...newReservation.dataValues, newReservationServices },
            newPoints: points.points - reservationData.points
        };
    } catch (err) {
        console.log(err)
        await transaction.rollback();      
        return { success: false, message: err.message };
    }
}


const getWorkHour = async (workHourId, transaction) => await WorkHour.findOne({ 
    where: { id: workHourId }, 
    raw: true, 
    lock: true, 
    transaction 
});
  
const decrementAvailablePlaces = async (workHourId, transaction) => {
    let [[_, isDecremented]] = await WorkHour.increment(
        { availablePlaces: -1 }, 
        { where: { id: workHourId }, transaction }
    );
    return isDecremented ? true : false;
}

const createReservation = async (reservationData, workHourDate, transaction) => {
    try {
        const newReservation = await Reservation.create({...reservationData, date: workHourDate }, { transaction });
        return newReservation;
    } catch (error) {
        console.log(error)
        throw new Error(messages.internalServerError)
    } 
}
  
const createReservationServices = async (reservationServicesIds, reservationId, transaction) => {
    try {
        const newReservationServices = await ReservationService.bulkCreate(reservationServicesIds.map(reservationServiceId => ({
            serviceId: reservationServiceId, 
            reservationId: reservationId
        })), { transaction });
    
        return newReservationServices;
    } catch (_) {
        throw new Error(messages.internalServerError)
    } 
}