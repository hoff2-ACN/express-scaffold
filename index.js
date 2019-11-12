const express = require('express');
const app = express();
// var expressWs = require('express-ws')(app);

// var aWss = expressWs.getWss('/');

// app.use(function (req, res, next) {
//   console.log('middleware');
//   req.testing = 'testing';
//   return next();
// });
//
// app.get('/', function(req, res, next){
//   console.log('get route', req.testing);
//   res.end();
// });

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
//
// app.listen(3000);

let server = app.listen(3000);

module.exports = { app, server };
