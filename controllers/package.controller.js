const db = require("../config/mongo.init");
const {v4: uuidv4} = require("uuid");

exports.saveHolidayPackage = async (req, res) => {
    try {
        const reservation = db.package({
            package_id: uuidv4(),
            package_destination: req.body.package_destination,
            package_duration: req.body.package_duration,
            package_travelers_count: req.body.package_travelers_count,
            package_speciality: req.body.package_speciality,
            package_filter_option: req.body.package_filter_option,
            package_price: req.body.package_price,
            package_rating: req.body.package_rating
        });
        const result = await reservation.save();

        if (result) {
            res.status(201).send({status: true, data: result})
        } else {
            res.status(200).send({status: false, message: 'Failed to save reservation'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Internal Server Error'})
    }
}

exports.getAllPackages = (req, res) => {
    try {
        db.package.find().exec().then(r => {
            if (r.length !== 0) {
                res.status(200).send({status: true, data: r})
            } else {
                res.status(200).send({status: false, message: 'No holiday package records are available'})
            }
        }).catch(e => {
            console.log('case', e)
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Internal Server Error'})
    }
}

exports.getSearchParams = async (req, res) => {
    try {
        let filters = await db.package.find().select(['package_destination', 'package_duration', 'package_travelers_count', 'package_speciality', 'package_price', 'package_rating']).exec();
        let package_destination = [...new Set(filters.map(item => item.package_destination))];
        let package_duration = [...new Set(filters.map(item => item.package_duration))];
        let package_travelers_count = [...new Set(filters.map(item => item.package_travelers_count))];
        let package_price = [...new Set(filters.map(item => item.package_price))];
        let package_rating = [...new Set(filters.map(item => item.package_rating))];

        let package_speciality = [...new Set(filters.flatMap(item => item.package_speciality))];

        res.status(200).send(JSON.stringify({
            package_destination: package_destination,
            package_duration: package_duration,
            package_travelers_count: package_travelers_count,
            package_speciality: package_speciality,
            package_price: package_price,
            package_rating: package_rating
        }))
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Internal Server Error'})
    }
}

exports.searchPackages = async (req, res) => {
    try {
        const searchQuery = {};

        if (req.body.package_destination) {
            searchQuery.package_destination = req.body.package_destination;
        }

        if (req.body.package_duration) {
            searchQuery.package_duration = req.body.package_duration;
        }

        if (req.body.package_travelers_count) {
            searchQuery.package_travelers_count = req.body.package_travelers_count;
        }

        if (req.body.package_speciality) {
            searchQuery.package_speciality = {$all: req.body.package_speciality};
        }

        if (req.body.package_price_min || req.body.package_price_max) {
            searchQuery.package_price = {};
            if (req.body.package_price_min) {
                searchQuery.package_price.$gte = req.body.package_price_min;
            }
            if (req.body.package_price_max) {
                searchQuery.package_price.$lte = req.body.package_price_max;
            }
        }

        if (req.body.package_rating) {
            searchQuery.package_rating = req.body.package_rating;
        }

        const packages = await db.package.find(searchQuery).exec();

        if (packages.length !== 0) {
            res.status(200).send({status: true, data: packages})
        } else {
            res.status(200).send({status: false, message: 'No package records are available'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Internal Server Error'})
    }
}

exports.savePackageReservations = async (req, res) => {
    try {
        const reservation = db.packageReservation({
            package_id: req.body.package_id,
            package_destination: req.body.package_destination,
            package_duration: req.body.package_duration,
            package_travelers_count: req.body.package_travelers_count,
            package_speciality: req.body.package_speciality,
            package_price: req.body.package_price,
            package_rating: req.body.package_rating
        });
        const result = await reservation.save();

        if (result) {
            res.status(201).send({status: true, data: result})
        } else {
            res.status(200).send({status: false, message: 'Failed to save reservation'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Internal Server Error'})
    }
}