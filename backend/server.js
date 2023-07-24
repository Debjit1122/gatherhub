require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); // Import the database connection

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventsRoutes');

// Use routes
app.use('/api', userRoutes);
app.use('/api', eventRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
