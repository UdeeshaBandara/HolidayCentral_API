const mongoose = require('mongoose');
const flightModel = require('../model/flight.model');
const flightReservationModel = require('../model/flight.reservation.model');
const dotenv = require('dotenv')
dotenv.config()
const db = {};

const connectDatabase = async() => {
    return await mongoose.connect(process.env.MONGOOSE_CONNECTION);
}

connectDatabase().then(connection => {
    db.flight = flightModel.FlightSchema(connection)
    db.flightReservation = flightReservationModel.FlightReservationSchema(connection)
})


module.exports = db;
