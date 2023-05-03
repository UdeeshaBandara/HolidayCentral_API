const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const makeRequired = (x) => x.required();
dotenv.config()

exports.checkLogin = (req, res, next) => {
    const { error } = userModel.joiUser.fork(['username','password'], makeRequired).validate({
        username: req.body.username,
        password: req.body.password
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}

exports.saveNewUser = (req, res, next) => {
    const {error} = userModel.joiUser.fork(['username', 'password', 'userType'], makeRequired).validate({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}

exports.checkValidJWT = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send({status : false, data: "Unauthorized"});
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                return next();
            }

        } catch (err) {
            return res.status(401).send({status : false, data: "Unauthorized"});
        }
    } else {
        return res.status(401).send({status : false, data: "Unauthorized"});
    }
};
