const flightModel = require("../model/flight.model");
const makeRequired = (x) => x.required();

exports.validateFlightParams = (req, res, next) => {
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
