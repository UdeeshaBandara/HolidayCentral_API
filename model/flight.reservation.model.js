const Joi = require('joi');
const {Schema} = require("mongoose");

exports.FlightReservationSchema = function (mongoose) {
    const flightReservationSchema = new Schema({
        flight_id: String,
        meal_type: String,
        first_name: String,
        last_name: String,
        email: String,
        cabin_type: String,
        phone: Number,
        price: Number,
        pax: Number,
    });

    return mongoose.model("flight_reservation", flightReservationSchema, "flight_reservation");
}

exports.joiFlightReservationSave = Joi.object({
    flight_id: Joi.string().required(),
    meal_type: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    cabin_type: Joi.string().required(),
    phone: Joi.number()
        .integer().required(),
    pax: Joi.number()
        .integer().required(),
})
