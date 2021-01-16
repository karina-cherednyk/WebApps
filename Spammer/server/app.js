const express = require('express');
const logger = require('morgan');
const { dbUrl } = require('./dao');
const mongoose = require("mongoose");
const {messagesRouter, emailsRouter } = require('./routes');
const port = process.env.PORT || 4000;

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

mongoose.connect(dbUrl,  { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => {
      app.use('/emails', emailsRouter);
      app.use('/messages', messagesRouter);



      app.listen(port, () =>
          console.log(`listening on ${port}`));

      mongoose.connection.on('error',
          console.error.bind(console, 'MongoDB connection error:'));

    });

module.exports = app;