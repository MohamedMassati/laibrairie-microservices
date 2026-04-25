const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
  idClient: { type: String, required: true },
  idLivre:  { type: String, required: true },
  dateEmprunt: { type: Date, default: Date.now },
  dateRetour:  { type: Date },
  retourne:    { type: Boolean, default: false }
});

module.exports = mongoose.model('Emprunt', empruntSchema);