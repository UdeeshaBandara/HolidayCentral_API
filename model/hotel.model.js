const Joi = require('joi');
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const hotelSchema = new Schema({id: 'string', HotelName: 'string', Roomtype: 'string'});

exports.HotelSchema = function (mongoose) {
    const hotelSchema = new Schema({
        location: String,
        checkIn: Date,
        checkOut: Date,
        room: String,
        Hotels: [hotelSchema],
        price: Number,
        heads: Number

        
    });

    return mongoose.model("hotel", hotelSchema, "hotel");
}
exports.joiHotelSearch = Joi.object({
    location: Joi.string().required(),
    hotel: Joi.string().required(),
    checkIn: Joi.string().required(),
    checkOut: Joi.string().required(),
    room: Joi.string().required(),
    heads: Joi.string().required(),
})

