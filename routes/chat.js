const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/:recipientId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: req.params.recipientId },
        { sender: req.params.recipientId, recipient: req.user._id }
      ]
    }).sort('timestamp');
    res.render('chat', { messages, recipientId: req.params.recipientId });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/message', async (req, res) => {
  try {
    const message = new Message({
      sender: req.user._id,
      recipient: req.body.recipient,
      content: req.body.content
    });
    await message.save();
    res.redirect(`/chat/${req.body.recipient}`);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
