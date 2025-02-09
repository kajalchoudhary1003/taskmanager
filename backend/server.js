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
      origin: "http://localhost:3000", // Allow only frontend origin
      methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
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
