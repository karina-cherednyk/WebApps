const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/router');
const { applierRouter, trainingRouter } = require('./routes/rest_routes');
const mongoose = require("mongoose");
const { dbUrl } = require('./dao');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/data/appliers', applierRouter);
app.use('/data/trainings', trainingRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(dbUrl,  { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => {
      app.use('/data/appliers', applierRouter);
      app.use('/data/trainings', trainingRouter);

      mongoose.connection.on('error',
          console.error.bind(console, 'MongoDB connection error:'));

    });
module.exports = app;
