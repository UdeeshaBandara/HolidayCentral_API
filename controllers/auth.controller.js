const db = require("../config/mongo.init");
const {v4: uuidv4} = require('uuid');
const jwt = require("jsonwebtoken");

exports.checkLogin = async (req, res) => {
    const jwtToken = jwt.sign(req.body, process.env.JWT_SECRET)
    db.user.find({username: req.body.username, password: req.body.password}).exec().then(r => {
        if (r[0]) {
            res.status(200).send(JSON.stringify(
                {
                    "access_token": jwtToken
                }
            ));
        } else {
            console.log(`no user found`);
            res.status(401).send({status: false, message: 'Please Check Your Credentials'})
        }
    })
}

exports.saveNewUser = async (req, res) => {
    const user = new db.user({
        userId: uuidv4(),
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
        createdAt: Date.now()
    });

    user.save().then(r => {
        if (r.length !== 0) {
            res.status(201).send(JSON.stringify(r));
        } else {
            res.status(400).send({status: false, message: 'Registration Failed'});
        }
    });
}

exports.getUser = async (req, res) => {
    db.user.find({username: req.jwt.username}).exec().then(r => {
        if (r[0]) {
            res.status(200).send(JSON.stringify(
                {
                    "status": true,
                    data: r[0]
                }
            ));
        } else {
            console.log(`no user found`);
            res.status(401).send({status: false, message: 'Please Check Your Credentials'})
        }
    })
}
