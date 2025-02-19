const Referral = require('../models/Referral');
const { sendEmail } = require('../utils/mailer');

exports.submitReferral = async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    // Validation
    if (!referrerName || !referrerEmail || !refereeEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to MongoDB
    const referral = new Referral(req.body);
    await referral.save();

    // Send Email
    await sendEmail({
      to: refereeEmail,
      subject: 'You’ve Been Referred!',
      text: `${referrerName} (${referrerEmail}) has referred you!`
    });

    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};