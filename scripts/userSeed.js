const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('../config/db');
const User = require('../models/userModel');

const SALT_ROUNDS = parseInt(process.env.SEED_BCRYPT_ROUNDS || '10', 10);

const users = [
  {
    username: 'ahmed',
    email: 'test@example.com',
    password: '1234',
    pets: ['69144e1773fefc7428506696', '69144e1c73fefc7428506698', '69144e2073fefc742850669a', '69144e4473fefc742850669c', '69144e5073fefc742850669e'],
  },
  {
    username: 'catLover',
    email: 'catlover@petquest.com',
    password: 'meowmeow',
  },
  {
    username: 'piggyPal',
    email: 'piggy@petquest.com',
    password: 'hayhay',
  },
];

async function seedUsers() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in your environment');
    }

    await connectDB();

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`Skipping ${userData.email} (already exists)`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

      await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        pets: userData.pets,
      });

      console.log(`Created user ${userData.email}`);
    }
  } catch (err) {
    console.error('User seeding failed:', err);
    throw err;
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

seedUsers()
  .then(() => {
    console.log('User seeding complete');
  })
  .catch(() => {
    process.exit(1);
  });

