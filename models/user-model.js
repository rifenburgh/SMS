const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const userSchema        = new Schema({
  username:             String,
  encryptedPassword:    String,
  firstname:            String,
  lastname:             String,
  phone:                String,
  email:                String
});
const User              = mongoose.model('User', userSchema);
module.exports          = User;
