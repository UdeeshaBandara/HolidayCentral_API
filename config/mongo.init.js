const mongoose = require('mongoose');
const flightModel = require('../model/flight.model');
const flightReservationModel = require('../model/flight.reservation.model');
const packageModel = require("../model/package.model");
const packageReservationModel = require('../model/package.reservation.model');
const dotenv = require('dotenv')
const userModel = require('../model/user.model');
dotenv.config()
const db = {};

const connectDatabase = async() => {
    return await mongoose.connect(process.env.MONGOOSE_CONNECTION);
}

connectDatabase().then(connection => {
    db.flight = flightModel.FlightSchema(connection)
    db.flightReservation = flightReservationModel.FlightReservationSchema(connection)
    db.package = packageModel.PackageSchema(connection)
    db.packageReservation = packageReservationModel.PackageReservationSchema(connection)
    db.user = userModel.UserSchema(connection)
})

module.exports = db;
