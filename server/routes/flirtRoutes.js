const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Send a flirt
router.post('/send', async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (senderId === receiverId) return res.status(400).json({ error: 'Cannot flirt with yourself' });

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!receiver.flirtsReceived.includes(senderId)) {
    receiver.flirtsReceived.push(senderId);
    sender.flirtsSent.push(receiverId);
    await receiver.save();
    await sender.save();
    return res.json({ message: 'Flirt sent!' });
  } else {
    return res.status(400).json({ error: 'Already flirted' });
  }
});

// Accept flirt and become match
router.post('/accept', async (req, res) => {
  const { senderId, receiverId } = req.body;

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  // Remove from flirts
  receiver.flirtsReceived = receiver.flirtsReceived.filter(id => id.toString() !== senderId);
  sender.flirtsSent = sender.flirtsSent.filter(id => id.toString() !== receiverId);

  // Add to matches
  if (!sender.matches.includes(receiverId)) sender.matches.push(receiverId);
  if (!receiver.matches.includes(senderId)) receiver.matches.push(senderId);

  await sender.save();
  await receiver.save();

  res.json({ message: 'You matched!' });
});

// Ignore flirt
router.post('/ignore', async (req, res) => {
  const { senderId, receiverId } = req.body;

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  receiver.flirtsReceived = receiver.flirtsReceived.filter(id => id.toString() !== senderId);
  sender.flirtsSent = sender.flirtsSent.filter(id => id.toString() !== receiverId);

  await sender.save();
  await receiver.save();

  res.json({ message: 'Flirt ignored.' });
});

// Get matches
router.get('/matches/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('matches', 'username profilePic');
  res.json(user.matches);
});

// Get flirts received
router.get('/flirts/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('flirtsReceived', 'username profilePic');
  res.json(user.flirtsReceived);
});

module.exports = router;
