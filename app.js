const express           = require('express');
const path              = require('path');
const favicon           = require('serve-favicon');
const logger            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const layouts           = require('express-ejs-layouts');
const mongoose          = require('mongoose');
const dotenv            = require('dotenv');
const User              = require('./models/user-model');
const io                = require('socket.io');

dotenv.config();
const client            = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

mongoose.connect(process.env.MONGODB_URI);

const app = express();
const http              = require('http').Server(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
/*
client.messages.create({
  to: process.env.TO,
  from: process.env.FROM,
  body: "Test Message via Twilio",
}, (err, message) => {
  console.log('SMS Sent');
});
*/

// const index = require('./routes/index');
// app.use('/', index);

const apiRoutes = require('./routes/api-routes');
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
