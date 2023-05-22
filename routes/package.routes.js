const PackageController = require('../controllers/package.controller')
const PackageMiddleware = require('../middleware/package.middleware')
const AuthMiddleware = require("../middleware/auth.middleware");

exports.routesConfig = function(app) {
    app.post('/packages/save', [
        AuthMiddleware.checkValidJWT,
        PackageMiddleware.validatePackageSave,
        PackageController.saveHolidayPackage
    ]);

    app.get('/packages', [
        AuthMiddleware.checkValidJWT,
        PackageController.getAllPackages
    ])

    app.get('/packages/params', [
        AuthMiddleware.checkValidJWT,
        PackageController.getSearchParams
    ])

    app.post('/packages/search', [
        AuthMiddleware.checkValidJWT,
        PackageMiddleware.validatePackageSearch,
        PackageController.searchPackages
    ])

    app.post('/packages/reserve', [
        AuthMiddleware.checkValidJWT,
        PackageMiddleware.validatePackageReservations,
        PackageController.savePackageReservations
    ])
};