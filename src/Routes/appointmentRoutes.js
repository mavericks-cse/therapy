// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');
const authenticate = require('../middleware/authMiddleware'); // if using auth

// Example protected routes
router.post('/book', authenticate, bookAppointment);
router.get('/my-appointments', authenticate, getAppointments);

module.exports = router; // ✅ export the router directly
