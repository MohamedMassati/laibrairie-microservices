const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom:   { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel:   { type: String }
});

module.exports = mongoose.model('Client', clientSchema);