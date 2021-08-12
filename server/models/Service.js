const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  contact: {
    businessName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  serviceBought: {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  paymentInfo: {
    cardNumber: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
});

module.exports = Service = mongoose.model("Service", ServiceSchema);
