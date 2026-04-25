const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  idClient: { type: String, required: true },
  montant:  { type: Number, required: true },
  statut:   { type: String, default: 'en_attente' }, // en_attente | traite
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Paiement', paiementSchema);