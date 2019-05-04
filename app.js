const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function(req, res) {
  res.send(layout('chelsi'));
});

module.exports = app;
