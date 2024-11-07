// models/Offer.js
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: String,
  price: Number,
  limit: { type: Number, default: 5 }, // max purchases per user
});

module.exports = mongoose.model('Offer', offerSchema);
