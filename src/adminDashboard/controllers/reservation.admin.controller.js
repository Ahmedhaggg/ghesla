let reservationService = require("../../services/reservation.service");
let pickerService = require("../../services/picker.service");
let reservationsStatusService = require("../../services/reservationsStatus.service")
let pagesTitles = require("../messages/pages.title");
let dashboardMessages = require("../messages/dashboard.messages");
const { RESERVATION_PENDING, RESERVATION_DOING, RESERVATION_COMPLETED } = require("../../config/constants");

exports.index = async (req, res, next) => {
    let { status, page } = req.query;
    
    let searchStatus = (
            status === RESERVATION_PENDING || 
            status === RESERVATION_DOING || 
            status === RESERVATION_COMPLETED
        ) ? status : null;

    let numberOfSkiped = page ? (page - 1) * 10 : 0;
    let reservations = await reservationService.findByStatusName(searchStatus,  numberOfSkiped, 10);
    let numberOfReservations = await reservationService.count(searchStatus);
    let statuses = await reservationsStatusService.findAll();
    res.render("reservations/index", {
        title: pagesTitles.RESERVATIONS,
        page: parseInt(page),
        reservations,
        numberOfReservations,
        statuses,
        status
    })
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let reservation = await reservationService.findOne({ id });
    
    if (!reservation)
        return res.redirect("/dashboard/404")

    let pickers = reservation.status.dataValues.name == RESERVATION_PENDING ? 
        await pickerService.findNotWorkingPickers()
        : null;
    
    let updateReservationError =  req.flash("updateReservationError")[0];
    let lastPickerChoosed = req.flash("lastPickerChoosed")[0];
    let pickerNotAvailableError = req.flash("pickerNotAvailableError")[0];
    res.render("reservations/show", {
        title: reservation.dataValues.name,
        reservation,
        pickers,
        updateReservationError,
        lastPickerChoosed,
        pickerNotAvailableError
    })
    
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { pickerId } = req.body;

    let pickerIsAddedToReservation = await reservationService.addPickerToReservation(id, pickerId);
    
    if (!pickerIsAddedToReservation) {
        req.flash("updateReservationError", dashboardMessages.updateReservationError);
        req.flash("lastPickerChoosed", pickerId);
    }
    res.redirect(`/dashboard/reservations/${id}`)
}
