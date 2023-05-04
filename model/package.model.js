const Joi = require('joi');
const {Schema} = require("mongoose");

exports.PackageSchema = function (mongoose) {
    const packageSchema = new Schema({
        package_id: String,
        package_destination: String,
        package_duration: Number,
        package_travelers_count: Number,
        package_speciality: Array,
        package_price: Number,
        package_rating: Number
    });

    return mongoose.model("package", packageSchema, "package");
}

exports.joiPackageSave = Joi.object({
    package_id: Joi.string(),
    package_destination: Joi.string(),
    package_duration: Joi.number().integer(),
    package_travelers_count: Joi.number().integer(),
    package_speciality: Joi.array(),
    package_filter_option: Joi.string(),
    package_price: Joi.number(),
    package_rating: Joi.number().min(1).max(5)
})

