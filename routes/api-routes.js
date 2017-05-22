const express           = require('express');
const apiRoutes         = express.Router();
const User              = require('../models/user-model');
const Sms               = require('../models/sms-model');
const el                = require('connect-ensure-login');
const dbModel           = require('../models/sms-model');


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

apiRoutes.get('/response', (req, res, next) => {});

apiRoutes.post('/response', (req, res, next) => {});



module.exports          = apiRoutes;
