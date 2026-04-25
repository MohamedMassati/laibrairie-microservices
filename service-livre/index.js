const express = require('express');
const mongoose = require('mongoose');
const Livre = require('./model');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/librairie_livres')
  .then(() => console.log('✅ MongoDB connected - Service Livre'))
  .catch(err => console.error(err));

// GET a book by id
app.get('/api/v1/livre/:id', async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) return res.status(404).json({ message: 'Non trouvé' });
    res.json(livre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all books
app.get('/api/v1/livre', async (req, res) => {
  const livres = await Livre.find();
  res.json(livres);
});

// POST add a book
app.post('/api/v1/livre', async (req, res) => {
  try {
    const livre = new Livre(req.body);
    await livre.save();
    res.status(200).json(livre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update a book
app.put('/api/v1/livre/:id', async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livre) return res.status(404).json({ message: 'Non trouvé' });
    res.json(livre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a book
app.delete('/api/v1/livre/:id', async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => console.log('Service Livre running on port 3001'));