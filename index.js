const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());

const expressWs = require('express-ws')(app);

const aWss = expressWs.getWss('/');

const messageHistory = [];

aWss.on('connection', (sender, req) => {
    sender.send(JSON.stringify(messageHistory));
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        aWss.clients.forEach(function (client) {
            console.dir(msg);
            client.send(msg);
        });
        messageHistory.push(msg);
    });
});

app.get('/message', (req, res) => {
    res.send(messageHistory);
});

app.post('/message', (req, res) => {
    messageHistory.push(req.body.message);
    res.ok();
});

let server = app.listen(3000);

module.exports = {app, server};
