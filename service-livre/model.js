const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  titre:  { type: String, required: true },
  auteur: { type: String, required: true },
  stock:  { type: Number, default: 1 }
});

module.exports = mongoose.model('Livre', livreSchema);