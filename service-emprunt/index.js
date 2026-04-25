const express = require('express');
const mongoose = require('mongoose');
const Emprunt = require('./model');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/librairie_emprunts')
  .then(() => console.log('MongoDB connected - Service Emprunt'))
  .catch(err => console.error(err));

// POST add a borrow
app.post('/api/v1/emprunt', async (req, res) => {
  try {
    const emprunt = new Emprunt(req.body);
    await emprunt.save();
    res.status(200).json(emprunt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST return a book
app.post('/api/v1/emprunt/retour', async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndUpdate(
      req.body.id,
      { retourne: true, dateRetour: new Date() },
      { new: true }
    );
    if (!emprunt) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Livre retourné', emprunt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all borrows
app.get('/api/v1/emprunt', async (req, res) => {
  try {
    const emprunts = await Emprunt.find();
    res.json(emprunts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET borrows by client
app.get('/api/v1/emprunt/:idClient', async (req, res) => {
  try {
    const emprunts = await Emprunt.find({ idClient: req.params.idClient });
    if (!emprunts.length) return res.status(404).json({ message: 'Aucun emprunt trouvé' });
    res.json(emprunts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3002, () => console.log('Service Emprunt running on port 3002'));