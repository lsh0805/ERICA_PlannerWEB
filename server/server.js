const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const app = express();
const api = require('./routes');
const sequelize = require('./models').sequelize;

sequelize.sync();

const port = 5000;
app.use('/api', api);

// /* support client-side routing */
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './../client/public/index.html'));
// });

const sessionData = fs.readFileSync('./config/session.json');
const sessionSecret = JSON.parse(sessionData);

app.use(session({
    secret: sessionSecret.secret,
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    console.log(req.session);
    res.send("Hello, World!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));