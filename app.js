const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');
const notFoundPage = require('./views/notFoundPage');
const serverError = require('./views/serverError');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', function(req, res) {
  res.redirect('/wiki');
});

app.use((req, res, next) => {
  res.status(404).send(notFoundPage());
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(serverError());
});

module.exports = app;
