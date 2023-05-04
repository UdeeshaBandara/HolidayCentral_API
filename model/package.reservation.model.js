const Joi = require('joi');
const {Schema} = require("mongoose");

exports.PackageReservationSchema = function (mongoose) {
    const packageReservationSchema = new Schema({
        package_id: String,
        package_destination: String,
        package_duration: Number,
        package_travelers_count: Number,
        package_speciality: Array,
        package_price: Number,
        package_rating: Number
    });

    return mongoose.model("package_reservation", packageReservationSchema, "package_reservation");
}

exports.joiPackageReservationSave = Joi.object({
    package_id: Joi.string().required(),
    package_destination: Joi.string().required(),
    package_duration: Joi.number().integer().required(),
    package_travelers_count: Joi.number().integer().required(),
    package_speciality: Joi.array().required(),
    package_price: Joi.number().required(),
    package_rating: Joi.number().min(1).max(5)
        .required()
})

