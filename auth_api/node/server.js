const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./services/db")

const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection.initialzeDb().then(() => {
    console.log('MySql initialized')
})

routes.init(app);

module.exports = app;
