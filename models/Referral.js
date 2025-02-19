const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrerName: { type: String, required: true },
  referrerEmail: { type: String, required: true },
  refereeName: String,
  refereeEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', referralSchema);