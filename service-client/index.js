const express = require('express');
const mongoose = require('mongoose');
const Client = require('./model');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/librairie_clients')
  .then(() => console.log('✅ MongoDB connected - Service Client'))
  .catch(err => console.error(err));

// GET all clients
app.get('/api/v1/client', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// GET client by id
app.get('/api/v1/client/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Non trouvé' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a client
app.post('/api/v1/client', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a client
app.delete('/api/v1/client/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Client supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3003, () => console.log('Service Client running on port 3003'));