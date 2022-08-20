const dotenv = require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./models');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("app/public"));

//Set app config
const title = process.env.TITLE || "Backend-Express";
const port = process.env.PORT || '3000';
const baseUrl = process.env.URL || "http://127.0.0.1:" + port || 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


require('./router/router.js')(app);

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(title + " run on " + baseUrl))
});