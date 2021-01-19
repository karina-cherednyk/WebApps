const express = require('express');
const messagesRouter = express.Router();
const emailsRouter = express.Router();
const { EmailInfo, Message } = require('./dao');
const sendMail = require('./mail');

messagesRouter.get('/', async (req, res) => {
    Message.find().then(data => res.send(data));
});

messagesRouter.post('/add', async (req, res) => {
    const msgJSON = req.body;
    const message = new Message(msgJSON);
    message.save()
        .then(data => res.send(data))
        .catch( e => res.status(500).send({'Error' : e }) );
});


messagesRouter.post('/send', async (req, res) => {
    const emails = JSON.parse(req.body.emails);
    const messageText = req.body.message;

    sendMail(emails, messageText)
        .then(data => { console.log(data); res.send("Message was sent"); })
        .catch( e => res.status(500).send({'Error' : e }) );
});

emailsRouter.get('/', async (req, res) => {
    EmailInfo.find().then(data => res.send(data));
} );

emailsRouter.post('/add', async (req, res) => {
    const emailJSON = req.body;
    const email = new EmailInfo(emailJSON);
    email.save()
        .then(data => res.send(data))
        .catch( e => res.status(500).send({'Error' : e }) );
});
emailsRouter.put('/set', async (req, res) => {
        const email = req.body;
        EmailInfo.findByIdAndUpdate(email._id, email)
            .then(() => EmailInfo.findById(email._id).then(data =>  res.send(data)) )
            .catch( e => res.status(404).send({'Error' : e }));
    }
);
emailsRouter.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    EmailInfo.findByIdAndDelete(id)
        .then(() => res.status(204).send() )
        .catch((e) => res.status(404).send({'Error' : e }));
});

module.exports = { messagesRouter, emailsRouter };