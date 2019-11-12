const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());

// var expressWs = require('express-ws')(app);

// var aWss = expressWs.getWss('/');

// app.ws('/', function(ws, req) {
//   ws.on('message', function(msg) {
//     console.log(msg);
//
//     aWss.clients.forEach(function (client) {
//       client.send(msg);
//     });
//   });
//   console.log('socket', req.testing);
// });

const messageHistory = [];

app.get('/message', (req, res) => {
    res.send(messageHistory);
});

app.post('/message', (req, res) => {
    messageHistory.push(req.body.message);
    res.ok();
});

let server = app.listen(3000);

module.exports = { app, server };
