const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/avatars', express.static('public/avatars'));

dotenv.config();

const connectDB = require('./config/db');

app.use('/api/pets', petRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
