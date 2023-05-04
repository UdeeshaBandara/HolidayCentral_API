const FlightController = require('../controllers/flight.controller')
const FlightMiddleware = require('../middleware/flight.middleware')
const AuthMiddleware = require('../middleware/auth.middleware')
exports.routesConfig = function(app) {
    app.get('/flight', [
        AuthMiddleware.checkValidJWT,
        FlightController.getAllFlights
    ]);

    app.get('/flight/query/param', [
        AuthMiddleware.checkValidJWT,
        FlightController.getSearchParams
    ]);

    app.post('/flight/query', [
        AuthMiddleware.checkValidJWT,
        FlightMiddleware.validateFlightSearchParams,
        FlightController.searchFlights
    ]);

    app.post('/flight/book', [
        AuthMiddleware.checkValidJWT,
        FlightMiddleware.validateFlightSave,
        FlightController.saveFlightReservation
    ]);

};
