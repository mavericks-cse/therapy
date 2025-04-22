// controllers/appointmentController.js

const Appointment = require('../models/appointment');

// Create a new appointment
const bookAppointment = async (req, res) => {
  const { date, time, therapist } = req.body;
  const userId = req.user._id;

  try {
    const appointment = new Appointment({
      user: userId,
      date,
      time,
      therapist,
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to book appointment', error: err.message });
  }
};

// Get appointments for logged-in user
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
};
