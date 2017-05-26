const express           = require('express');
const apiRoutes         = express.Router();
const User              = require('../models/user-model');
const Sms               = require('../models/sms-model');
const Message           = require('../models/message-model');
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
  //Add SMS to Messages database
  const newItem         = new Message({
    ToState:            req.body.ToState,
    SmsMessageSid:      req.body.SmsMessageSid,
    ToCity:             req.body.ToCity,
    FromState:          req.body.FromState,
    FromZip:            req.body.FromZip,
    SmsStatus:          req.body.SmsStatus,
    FromCity:           req.body.FromCity,
    Body:               req.body.Body,
    ToZip:              req.body.ToZip,
    To:                 req.body.To,
    AccountSid:         req.body.AccountSid,
    MessageSid:         req.body.MessageSid
  });
  newItem.save((err) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong." });
    }
    res.send(`<Response><Message>Hello ${fromPhone}</Message></Response>`);
  });
  
  //Add customer or add conversation to the customer's account
  const fromPhone              = req.body.From;
  console.log("SMSSID:", SmsSid);
  console.log("REQ.BODY", req.body);

  /*
  const messageSid      = req.body.messageSid;
  console.log(messageSid);
  http.createServer((req, res) => {
    const twiml         = new twilio.TwimlResponse();
    twiml.message('SPR Response to your SMS.');
    console.log(twiml.message);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.send(twiml.toString());
  }).listen(1337, "https://radiant-forest-23151.herokuapp.com/");
  */
});

apiRoutes.get('/response', (req, res, next) => {
  //console.log(req.body);
  console.log("From ", req.params.From);
  res.send('<Response><Message>Hello</Message></Response>');
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
