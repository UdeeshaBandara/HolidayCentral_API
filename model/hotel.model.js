const Joi = require('joi');
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const hotelRoomSchema = new Schema({id: 'string', HotelName: 'string'});

exports.HotelSchema = function (mongoose) {
    const hotelSchema = new Schema({
        location: String,
        checkIn: Date,
        checkOut: Date,
        room: String,
        Hotels: [hotelRoomSchema],
        price: Number,
        heads: Number,
        option1 : String,
        option2 : String,
        option3 : String,


        
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
    option1: Joi.string().required(),
    option2: Joi.string().required(),
    option3: Joi.string().required(),
})

