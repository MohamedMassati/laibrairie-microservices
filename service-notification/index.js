const express = require('express');
const mongoose = require('mongoose');
const Notification = require('./model');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/librairie_notifications')
  .then(() => console.log('✅ MongoDB connected - Service Notification'))
  .catch(err => console.error(err));

// POST receive a notification (async simulation)
app.post('/api/v1/notification', async (req, res) => {
  try {
    const notif = new Notification(req.body);
    await notif.save();
    console.log(`📨 Notification reçue: ${notif.message}`);

    // Simulate async sending
    setTimeout(async () => {
      notif.envoye = true;
      await notif.save();
      console.log(`✅ Notification envoyée à ${notif.clientEmail}`);
    }, 2000);

    res.status(200).json({ message: 'Notification en cours d\'envoi', notif });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all notifications
app.get('/api/v1/notification', async (req, res) => {
  const notifs = await Notification.find();
  res.json(notifs);
});

app.listen(3004, () => console.log('Service Notification running on port 3004'));