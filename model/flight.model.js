const Joi = require('joi');
const {Schema} = require("mongoose");

const cabinSchema = new Schema({id: 'string', cabinName: 'string'});

exports.FlightSchema = function (mongoose) {
    const flightSchema = new Schema({
        departure: String,
        arrival: String,
        departureTime: Date,
        arrivalTime: Date,
        airline: String,
        cabins: [cabinSchema],
        price: Number,
        duration: Number,
        transit: Number,
        flightNo: String,
        airlineImage: String,
        meals: String,
        seats: String
    });

    return mongoose.model("flight", flightSchema, "flight");
}
exports.joiFlightSearch = Joi.object({
    departure: Joi.string().required(),
    arrival: Joi.string().required(),
    departure_time: Joi.string().required(),
    arrival_time: Joi.string().required(),
    cabin: Joi.string().required(),
})

