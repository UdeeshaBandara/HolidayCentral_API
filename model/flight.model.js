const Joi = require('joi');
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const cabinSchema = new Schema({ id: 'string' ,cabinName: 'string' });

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

    return  mongoose.model("Model", flightSchema,"flight");
}
exports.joiExercise = Joi.object({
    exerciseId: Joi.string(),
    exerciseName: Joi.string(),
    exerciseDuration: Joi.number()
        .integer()
        .min(0)
        .max(120),
    userType: Joi.number()
        .integer()
        .min(0)
        .max(2),
    exerciseType: Joi.number()
        .integer()
        .min(0)
        .max(2),
    exerciseGender: Joi.number()
        .integer()
        .min(0)
        .max(1),
    focusedArea: Joi.number()
        .integer()
        .min(0),
    dayCount: Joi.number()
        .integer()
        .min(1)
        .max(7),
    exerciseCount:   Joi.number()
        .integer()
        .min(1)
        .max(7),
    exerciseCalories: Joi.number()
        .min(0),
    exerciseBannerURL: Joi.string()
})
