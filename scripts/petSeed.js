const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('../config/db');
const User = require('../models/userModel');
const Pet = require('../models/petModel');

const TARGET_EMAIL = process.env.SEED_OWNER_EMAIL || 'test@example.com';

async function assignPetsToUser() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in your environment');
    }

    await connectDB();

    const user = await User.findOne({ email: TARGET_EMAIL });
    if (!user) {
      throw new Error(`User with email ${TARGET_EMAIL} not found`);
    }

    const filter = {
      $or: [{ owner: { $exists: false } }, { owner: null }],
    };

    const result = await Pet.updateMany(filter, { owner: user._id });

    console.log(
      `Assigned owner ${TARGET_EMAIL} to ${result.modifiedCount} of ${result.matchedCount} pets needing owners`
    );
  } catch (err) {
    console.error('Pet seeding failed:', err);
    throw err;
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

assignPetsToUser()
  .then(() => console.log('Pet seeding complete'))
  .catch(() => process.exit(1));

