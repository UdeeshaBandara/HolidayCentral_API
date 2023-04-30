const db = require("../config/mongo.init");
const moment = require("moment");


exports.getAllFlights = (req, res) => {

    db.flight.find().exec().then(r => {
        if (r.length !== 0) {

            res.status(200).send(JSON.stringify(r))
        } else {
            res.status(200).send({status: false, message: 'No flight records are available'})
        }
    }).catch(e => {
        console.log('case', e)
    })
}
exports.getSearchParams = async (req, res) => {

    let filters = await db.flight.find().select(['departure', 'arrival', 'cabins', 'airline']).exec();
    let distinctDepartures = [...new Set(filters.map(item => item.departure))];
    let distinctArrivals = [...new Set(filters.map(item => item.arrival))];
    let distinctAirline = [...new Set(filters.map(item => item.airline))];

    let cabins = []
    filters.forEach(item => {
        cabins = [...cabins, ...item.cabins]
    });

    res.status(200).send(JSON.stringify({
        departures: distinctDepartures,
        arrivals: distinctArrivals,
        airlines: distinctAirline,
        cabins: cabins
    }))
}
exports.searchFlights = async (req, res) => {

    req.body.departure_time = moment(req.body.departure_time).utc().startOf("day").format("X");
    req.body.arrival_time = moment(req.body.arrival_time).utc().startOf("day").format("X");

    let flights = await db.flight.find({
        'departure': req.body.departure,
        'arrival': req.body.arrival,
        $or: [{"departure_time": {$gt: req.body.departure_time}}, {"arrival_time": {$lt: req.body.arrival_time}}, {"airline": req.body.airline}, {"cabins.name": req.body.cabin}]
    }).exec();
    if (flights.length !== 0) {

        res.status(200).send(JSON.stringify(flights))
    } else {
        res.status(200).send({status: false, message: 'No flight records are available'})
    }
}
exports.saveFlightReservation = async (req, res) => {


}
