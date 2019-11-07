'use strict';

/*
* NPM Module Dependies
*/
const express = require('express');

/*
*  Express declarations
*/
const routes = require('./routes/index');
const app = express();
app.enable('trust proxy');
app.use('/', routes);
app.use(express.static('public'))
module.exports = app
