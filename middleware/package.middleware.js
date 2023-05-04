const packageModel = require("../model/package.model");
const packageReservationModel = require("../model/package.reservation.model");
const makeRequired = (x) => x.required();

exports.validatePackageSave = (req, res, next) => {
    const {error} = packageModel.joiPackageSave.fork(['package_destination', 'package_duration', 'package_travelers_count', 'package_speciality', 'package_price', 'package_rating'], makeRequired).validate({
        package_id: req.body.package_id,
        package_destination: req.body.package_destination,
        package_duration: req.body.package_duration,
        package_travelers_count: req.body.package_travelers_count,
        package_speciality: req.body.package_speciality,
        package_price: req.body.package_price,
        package_rating: req.body.package_rating
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}

exports.validatePackageSearch = (req, res, next) => {
    const {error} = packageModel.joiPackageSave.validate({
        package_id: req.body.package_id,
        package_destination: req.body.package_destination,
        package_duration_min: req.body.package_duration_min,
        package_duration_max: req.body.package_duration_max,
        package_travelers_count: req.body.package_travelers_count,
        package_speciality: req.body.package_speciality,
        package_price_min: req.body.package_price_min,
        package_price_max: req.body.package_price_max,
        package_rating_min: req.body.package_rating_min,
        package_rating_max: req.body.package_rating_max
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}

exports.validatePackageReservations = (req, res, next) => {
    const {error} = packageReservationModel.joiPackageReservationSave.validate({
        package_id: req.body.package_id,
        package_destination: req.body.package_destination,
        package_duration: req.body.package_duration,
        package_travelers_count: req.body.package_travelers_count,
        package_speciality: req.body.package_speciality,
        package_price: req.body.package_price,
        package_rating: req.body.package_rating
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}