const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const customerSchema    = ({
  phone:                String,
  firstname:            String,
  lastname:             String,
  email:                String,
  address:              String,
  address2:             String,
  city:                 String,
  state:                String,
  zip:                  String,
  notes:                String,
  price:                String,
  duedate:              String
  //Include Cake Details
  //Include Delivery Address
  //Include Delivery Time

});

const Customer          = mongoose.model('Customer', customerSchema);
module.exports          = Customer;
