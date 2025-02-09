require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
// Configure CORS
app.use(
    cors({
      origin: "https://taskmanager-jet.vercel.app/", // Allow only frontend origin
      methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed HTTP methods
      credentials: true, // Allow cookies if using authentication
    })
  );

// Connect to MongoDB atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Import Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
