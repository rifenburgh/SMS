const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const smsSchema       = new Schema({
  name:               String,
  phone:              String,
  note:               String,
  cake:               String,
  texts:              Array
});


const Sms             = mongoose.model('Sms', smsSchema);
module.exports        = Sms;
