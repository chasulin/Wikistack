const express = require('express');
// instantiate app as instance of express
const app = express();
// morgan is logging middleware so we can see the info of every req/res logged in console
const morgan = require('morgan');
// path redirects to public
const path = require('path');
const layout = require('./views/layout');
const { db } = require('./models');

// use morgan logging middleware
app.use(morgan('dev'));
// serving up static files (e.g. css files)
app.use(express.static(path.join(__dirname, './public')));
// parses urlencoded middleware
// takes in incoming url encoded incoming payloads and parses them
app.use(express.urlencoded({ extended: false }));
// takes in json payloads and parses them
app.use(express.json());

app.get('/', function(req, res) {
  res.send(layout('chelsi'));
});
const PORT = 3000;

// app.listen(PORT, () => {
//   console.log('hello world');
// });

module.exports = app;
