const db = require("../config/mongo.init");


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
