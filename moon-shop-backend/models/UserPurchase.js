// models/UserPurchase.js
const mongoose = require('mongoose');

const userPurchaseSchema = new mongoose.Schema({
  userId: String,
  offerId: mongoose.Schema.Types.ObjectId,
  purchasedCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('UserPurchase', userPurchaseSchema);
