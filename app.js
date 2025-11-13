const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv')
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());
// Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist/pet-quest/browser')));
app.use('/avatars', express.static('public/avatars'));

dotenv.config();

const connectDB = require('./config/db');

app.use('/api/auth', authRoutes);
app.use('/api/pets', auth, petRoutes);
app.use('/api/tasks', auth, taskRoutes);

// Fallback route for Angular
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/pet-quest/browser/index.html'));
});

module.exports = app;

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
