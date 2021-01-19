const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require("mongoose");
const { dbUrl } = require('./dao');
const expressWs = require('express-ws');
const getRouter = require('./routes/rest_routes');
const router = require('./routes/routes');

const app = express();
const wsInstance = expressWs(app);
const port = process.env.PORT || 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dbUrl,  { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => {
        app.use('/data', getRouter(wsInstance));
        app.use('/', router);
        app.listen(port, () =>
            console.log(`listening on ${port}`));

        mongoose.connection.on('error',
            console.error.bind(console, 'MongoDB connection error:'));

    });

module.exports =  app;
