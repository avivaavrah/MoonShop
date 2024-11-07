


// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const Offer = require('./models/Offer');
const UserPurchase = require('./models/UserPurchase');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moon-shop', {});

app.get("/", (req, resp) => {
    resp.send("app is working.!.")
});
// Get all offers
app.get('/api/offers', async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

// Get user's purchase counts for all offers
app.get('/api/user-purchases/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userPurchases = await UserPurchase.find({ userId });
      res.json(userPurchases);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Purchase an offer
app.post('/api/purchase', async (req, res) => {
  const { userId, offerId } = req.body;
debugger
  // Find the offer and user purchase record
  const offer = await Offer.findById(offerId);
  const userPurchase = await UserPurchase.findOne({ userId, offerId });

  // Check if the user can still purchase this offer
  if (userPurchase && userPurchase.purchasedCount >= offer.limit) {
    return res.status(403).json({ message: 'Purchase limit reached' });
  }

  // Update or create the user purchase record
  if (userPurchase) {
    userPurchase.purchasedCount += 1;
    await userPurchase.save();
  } else {
    await UserPurchase.create({ userId, offerId, purchasedCount: 1 });
  }

  res.status(200).json({ message: 'Purchase successful' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
