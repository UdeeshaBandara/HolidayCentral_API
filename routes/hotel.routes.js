const HotelController = require('../controllers/hotel.controller')
const HotelMiddleware = require('../middleware/hotel.middleware')
const AuthMiddleware = require('../middleware/hotel.middleware')
exports.routesConfig = function(app) {
    app.get('/hotel', [
        AuthMiddleware.checkValidJWT,
        HotelController.getAllHotels
    ]);

    app.get('/hotel/query/param', [
        AuthMiddleware.checkValidJWT,
        HotelController.getSearchParams
    ]);

    app.post('/hotel/query', [
        AuthMiddleware.checkValidJWT,
        HotelMiddleware.validateHotelSearchParams,
        HoteltController.searchhotels
    ]);
    app.post('/flight/book', [
        AuthMiddleware.checkValidJWT,
        HotelController.validateHoteltSave,
        HotelMiddleware.saveHotelReservation
    ]);

};
