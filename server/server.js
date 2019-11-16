const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const fs = require('fs');
const app = express();
const api = require('./routes');
const sequelize = require('./models').sequelize;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

sequelize.sync();

const port = 5000;

const conf = fs.readFileSync('./config/config.json');
const options = (JSON.parse(conf)).options;
var sessionStore = new mysqlStore(options);
const sessionData = fs.readFileSync('./config/session.json');
const sessionSecret = JSON.parse(sessionData);

app.use(session({
    key: 'connect.sid',
    secret: sessionSecret.secret,
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    httpOnly: false,
    secure: false
}));


app.get('/', (req, res) =>{
    console.log(req.session.id);
    res.send(req.session.id);
});

app.use('/api', api);

app.listen(port, () => console.log(`Listening on port ${port}`));