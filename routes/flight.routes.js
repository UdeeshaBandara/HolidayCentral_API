const FlightController = require('../controllers/flight.controller')
exports.routesConfig = function(app) {
    app.get('/flight', [
        FlightController.getAllFlights
    ]);

    app.get('/flight/query/param', [
        FlightController.getSearchParams
    ]);

};
