const express = require('express');
const fs = require('fs');
const sendMail = require('../mail');
const config = JSON.parse(fs.readFileSync('../config.json'));


const applierRouter = express.Router();
const trainingRouter = express.Router();
const { Applier, Training } = require('../dao');

applierRouter.get('/', async (req, res) => {
    if(config.emailConfirmation) Applier.find({confirmedEmail: true}).then(data => res.send(data));
    else Applier.find().then(data => res.send(data));
});
trainingRouter.get('/', async (req, res) => {
    Training.find().then(data => res.send(data));
});

applierRouter.post('/add', async (req, res) => {
    let msgJSON = req.body;
    msgJSON.status = 'not seen';
    msgJSON.confirmedEmail = false;
    const applier = new Applier(msgJSON);
    applier.save()
        .then(data => {
            if(config.emailConfirmation) sendMail(applier.email, applier._id);
            res.send(data)
        })
        .catch( e =>  res.status(500).send({'Error': e}));
});

trainingRouter.post('/add', async (req, res) => {
    const msgJSON = JSON.parse(Object.keys(req.body)[0]);
    const training = new Training(msgJSON);
    training.save()
        .then(data => res.send(data))
        .catch( e =>  res.status(500).send({'Error': e}));
});

applierRouter.put('/status', async(req,res) => {
    const msgJSON = req.body;
    Applier.findByIdAndUpdate(msgJSON.id, {status: msgJSON.status})
        .then(res.send())
        .catch( e =>  res.status(500).send({'Error': e}));
});

module.exports = { applierRouter, trainingRouter };