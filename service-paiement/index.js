const express = require('express');
const mongoose = require('mongoose');
const Paiement = require('./model');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/librairie_paiements')
  .then(() => console.log('✅ MongoDB connected - Service Paiement'))
  .catch(err => console.error(err));

// POST make a payment (async simulation)
app.post('/api/v1/paiement', async (req, res) => {
  try {
    const paiement = new Paiement(req.body);
    await paiement.save();
    console.log(`💳 Paiement reçu: ${paiement.montant} MAD`);

    // Simulate async processing
    setTimeout(async () => {
      paiement.statut = 'traite';
      await paiement.save();
      console.log(`✅ Paiement traité pour client ${paiement.idClient}`);
    }, 3000);

    res.status(200).json({ message: 'Paiement en traitement', paiement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all payments
app.get('/api/v1/paiement', async (req, res) => {
  const paiements = await Paiement.find();
  res.json(paiements);
});

app.listen(3005, () => console.log('Service Paiement running on port 3005'));