const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  notes: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
