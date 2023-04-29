const mongoose = require('mongoose');
const flightModel = require('../model/flight.model');
const dotenv = require('dotenv')
const userModel = require('../models/user.model');
dotenv.config()
const db = {};

const connectDatabase = async() => {
    return await mongoose.connect(process.env.MONGOOSE_CONNECTION);
}

connectDatabase().then(connection => {
    db.flight = flightModel.FlightSchema(connection)
    db.user = userModel.UserSchema(connection)
})


module.exports = db;
