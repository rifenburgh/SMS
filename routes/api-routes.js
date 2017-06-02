const express           = require('express');
const apiRoutes         = express.Router();
const User              = require('../models/user-model');
const Sms               = require('../models/sms-model');
const Message           = require('../models/message-model');
const Customer          = require('../models/customer-model');
const el                = require('connect-ensure-login');
const dbModel           = require('../models/sms-model');
const http              = require('http');
const twilio            = require('twilio');
const mongoose          = require('mongoose');


const client            = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

apiRoutes.get('/testsend', (req, res, next) => {
  res.render('testsend.ejs');
});

apiRoutes.post('/sendtext/:phone/:text', (req, res, next) => {
  console.log('/sendtext/req.body', req.body);
  console.log('/api/sendtext/text', req.body.text);
  const phone           = req.params.phone;
  const text            = req.params.text;
  const newMessage      = new Message({
    Body:               req.params.text,
    phone:              req.params.phone,
    customer:           false,
    ToState:            req.body.ToState,
    SmsMessageSid:      req.body.SmsMessageSid,
    ToCity:             req.body.ToCity,
    FromState:          req.body.FromState,
    FromZip:            req.body.FromZip,
    SmsStatus:          req.body.SmsStatus,
    FromCity:           req.body.FromCity,
    ToZip:              req.body.ToZip,
    To:                 req.body.To,
    AccountSid:         req.body.AccountSid,
    MessageSid:         req.body.MessageSid
  });
  newMessage.save();
  client.messages.create({
    to: phone,
    from: process.env.FROM,
    body: text,
  }, (err, message) => {
    console.log('SMS Sent');
  });
});


// apiRoutes.post('/testsend', (req, res, next) => {
//   const text            = req.body.text;
//   const phone           = req.body.phone;
//   const newMessage      = new Message({
//     Body:               req.body.text,
//     phone:              process.env.TO,
//     customer:           false
//   });
//   newMessage.save();
//   client.messages.create({
//     to: process.env.TO,
//     from: process.env.FROM,
//     body: phone + ' - ' + text,
//   }, (err, message) => {
//     console.log('SMS Sent');
//   });
// });

apiRoutes.post('/response', (req, res, next) => {
  //Respond with a generic SMS message
  // res.send(`<Response><Message>Hello</Message></Response>`);

  //Add SMS to Messages database
  const newItem         = new Message({
    ToState:            req.body.ToState,
    SmsMessageSid:      req.body.SmsMessageSid,
    ToCity:             req.body.ToCity,
    FromState:          req.body.FromState,
    FromZip:            req.body.FromZip,
    From:               req.body.From,
    phone:              req.body.From,  //phone is used to identify customer in message and customer models
    SmsStatus:          req.body.SmsStatus,
    FromCity:           req.body.FromCity,
    Body:               req.body.Body,
    ToZip:              req.body.ToZip,
    To:                 req.body.To,
    AccountSid:         req.body.AccountSid,
    MessageSid:         req.body.MessageSid
  });
  newItem.save();

  //If new number, create a new Customer database object
  const fromPhone         = req.body.From;
  Customer.find({ phone: fromPhone }, function (err, count) {
    console.log("Count Length ", count.length);
    if (count.length < 1) {
      console.log("Customer does not currently exist.", count);
      const newCustomer  = new Customer ({
        phone:           req.body.From
      });
      newCustomer.save();
    } else {
      console.log("Customer already exists ", count);
    }
    // console.log("Customer Phone was found.", count);
    // console.log("fromPhone ", fromPhone);
  });
});

apiRoutes.get('/response', (req, res, next) => {
  //console.log(req.body);
  console.log("From ", req.params.From);
  res.send('<Response><Message>Hello</Message></Response>');
});

apiRoutes.get('/listcustomers', (req, res, next) => {
  //List All Customers in the Customer collection
  Customer.find({}, (err, items) => {
    if (err) {
      next(err);
      return;
    }
    res.json(items);

    // res.render('listcustomers.ejs', { items: item });
  });
});

apiRoutes.get('/listmessages', (req, res, next) => {
  Message.find({}, (err, items) => {
    if (err) {
      next(err);
      return;
    }
    res.json(items);
    //res.render('listmessages.ejs', { items: item });
  });
});

apiRoutes.get('/listmessage/:from', (req, res, next) => {
  const fromPhone             = req.params.from;
  // console.log("/listmes/from", fromPhone);
  Message.find({ 'From': fromPhone }, (err, items) => {
    if (err) {
      next(err);
      return;
    }
    // console.log('/listmessages/from', items);
    res.json(items);
    // res.render('listmessages.ejs', { items: item });
  });
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
