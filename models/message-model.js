const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const messageSchema      = ({
  ToState:              String,
  SmsMessageSid:        String,
  ToCity:               String,
  FromState:            String,
  FromZip:              String,
  SmsStatus:            String,
  FromCity:             String,
  Body:                 String,
  ToZip:                String,
  To:                   String,
  AccountSid:           String,
  MessageSid:           String,
  created:              { type: Date, default: Date.now }
});

const Message           = mongoose.model('Message', messageSchema);
module.exports          = Message;
