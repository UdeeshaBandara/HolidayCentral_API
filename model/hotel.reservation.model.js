const Joi = require('joi');
const {Schema} = require("mongoose");

exports.HotelReservationSchema = function (mongoose) {
    const hotelReservationSchema = new Schema({
        hotel_id: String,
        first_name: String,
        last_name: String,
        email: String,
        room_type: String,
        phone: Number,
        price: Number,
        heads: Number,
        board_basis : String,
        room_selection : String,
    });

    return mongoose.model("hotel_reservation", hotelReservationSchema, "hotel_reservation");
}

exports.joiHotelReservationSave = Joi.object({
    hotel_id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    room_type: Joi.string().required(),
    phone: Joi.number()
        .integer().required(),
    price: Joi.number()
        .integer().required(),
    heads: Joi.number()
        .integer().required(),
    board_basis : Joi.string().required(),
    room_selection : Joi.string().required(),
})
