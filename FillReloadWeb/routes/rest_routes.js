const express = require('express');
const router = express.Router();

const { Book } = require('../dao');


function getRouter(wsInstance) {
    router.get('/', async (req, res) => {
        Book.find().then(data => res.send(data));
    });
    router.ws('/', (ws, res) => {
        ws.on('message', function(msg) {
            ws.send(msg);
        });
    });
    router.post('/add', async (req, res) => {
        const msgJSON = req.body;
        const message = new Book(msgJSON);
        message.save()
            .then(data => {
                wsInstance.getWss().clients.forEach( c => c.send(JSON.stringify(data)));
                res.redirect('/');
            })
            .catch(e => res.status(500).send({'Error': e}));
    });
    return router;
}

module.exports = getRouter;
