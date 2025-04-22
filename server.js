const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // ✅ correct import
const appointmentRoutes = require('./routes/appointmentRoutes'); // if using

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use routers
app.use('/api', userRoutes);
app.use('/api/appointments', appointmentRoutes); // optional
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log('Connected to MongoDB');
  app.listen(2005, () => console.log('Server running on port 2005'));
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
