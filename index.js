const express = require('express')
const app = express()
const dotenv = require('dotenv')
const FlightRouter = require("./routes/flight.routes");
const AuthRouter = require("./routes/auth.routes");
const FlightRouter = require("./routes/flight.routes");
dotenv.config()

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type');
    res.header('Content-Type', 'application/json');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.get('/', function (req, res) {
    res.send(JSON.stringify({status: true, message: "Holiday Central Backend - Up and running!!!"}));
})

AuthRouter.routesConfig(app);
FlightRouter.routesConfig(app);

app.listen(3001, () => console.log(`App is listening port ${process.env.PORT || 3001}`))
