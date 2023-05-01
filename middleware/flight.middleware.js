const flightModel = require("../model/flight.model");
const flightReservationModel = require("../model/flight.reservation.model");

exports.validateFlightSearchParams = (req, res, next) => {
    const {error} = flightModel.joiFlightSearch.validate({
        departure: req.body.departure,
        arrival: req.body.arrival,
        departure_time: req.body.departure_time,
        arrival_time: req.body.arrival_time,
        cabin: req.body.cabin,
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}

exports.validateFlightSave = (req, res, next) => {
    const {error} = flightReservationModel.joiFlightReservationSave.validate({
        flight_id: req.body.flight_id,
        meal_type: req.body.meal_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        cabin_type: req.body.cabin_type,
        seat_type: req.body.seat_type,
        price: req.body.price,
        phone: req.body.phone,
        pax: req.body.pax,
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}
