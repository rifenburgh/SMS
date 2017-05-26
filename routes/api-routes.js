const express           = require('express');
const apiRoutes         = express.Router();
const User              = require('../models/user-model');
const Sms               = require('../models/sms-model');
const el                = require('connect-ensure-login');
const dbModel           = require('../models/sms-model');
const http              = require('http');
const twilio            = require('twilio');


const client            = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

apiRoutes.get('/testsend', (req, res, next) => {
  res.render('testsend.ejs');
});

apiRoutes.post('/testsend', (req, res, next) => {
  const text            = req.body.text;
  const phone           = req.body.phone;
  client.messages.create({
    to: process.env.TO,
    from: process.env.FROM,
    body: phone + ' - ' + text,
  }, (err, message) => {
    console.log('SMS Sent');
  });
});

apiRoutes.post('/response', (req, res, next) => {
  res.send('<Response><Message>Hello</Message></Response>');
  /*
  const messageSid      = req.body.messageSid;
  console.log(messageSid);
  http.createServer((req, res) => {
    const twiml         = new twilio.TwimlResponse();
    twiml.message('SPR Response to your SMS.');
    console.log(twiml.message);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }).listen(1337, "https://radiant-forest-23151.herokuapp.com/");
  */
});

apiRoutes.get('/response', (req, res, next) => {
  http.createServer((req, res) => {
    var twiml           = new twilio.TwimlResponse();
    twiml.message('SPR Response to your SMS.');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }).listen(1337);
});

apiRoutes.post('/testresponse', (req, res, next) => {
  http.createServer((req, res) => {
    var twiml             = new twilio.TwimlResponse();
    twiml.message('Thanks for the text.');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }).listen(1337);
});


module.exports          = apiRoutes;
