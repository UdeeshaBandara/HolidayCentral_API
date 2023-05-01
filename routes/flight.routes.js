const FlightController = require('../controllers/flight.controller')
const FlightMiddleware = require('../middleware/flight.middleware')
exports.routesConfig = function(app) {
    app.get('/flight', [
        FlightController.getAllFlights
    ]);

    app.get('/flight/query/param', [
        FlightController.getSearchParams
    ]);

    app.post('/flight/query', [
        FlightMiddleware.validateFlightSearchParams,
        FlightController.searchFlights
    ]);
    app.post('/flight/book', [
        FlightMiddleware.validateFlightSave,
        FlightController.saveFlightReservation
    ]);

};
