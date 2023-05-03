const db = require("../config/mongo.init");
const {v4: uuidv4} = require('uuid');
const jwt = require("jsonwebtoken");

exports.checkLogin = (req, res) => {
    const jwtToken = jwt.sign(req.body, process.env.JWT_SECRET)
    db.user.find({username: req.body.username, password: req.body.password}).exec().then(r => {
        const result = r[0];
        if (r != null) {
            res.status(200).send(JSON.stringify(
                {
                    result,
                    "access_token": jwtToken
                }
            ));
        } else {
            console.log(`no user found`);
            res.status(500).send([])
        }
    })
}

exports.saveNewUser = (req, res) => {
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

            res.status(500).send([]);
        }
    });
}

exports.getUser = (req, res) => {
    db.user.find({username: req.jwt.username}).exec().then(r => {
        const result = r[0];
        if (r != null) {

            res.status(200).send(JSON.stringify(result));
        } else {

            res.status(500).send([])
        }
    })
}
