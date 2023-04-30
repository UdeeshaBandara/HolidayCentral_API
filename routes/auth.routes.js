const AuthController = require('../controllers/auth.controller')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function(app) {
    app.post('/user/login', [
        AuthMiddleware.checkLogin,
        AuthController.checkLogin
    ]);

    app.get('/user', [
        AuthMiddleware.checkValidJWT,
        AuthMiddleware.checkUser,
        AuthController.getUser
    ])

    app.post('/user/register', [
        AuthMiddleware.saveNewUser,
        AuthController.saveNewUser
    ]);
};