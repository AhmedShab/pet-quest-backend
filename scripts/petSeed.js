const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('../config/db');
const User = require('../models/userModel');
const Pet = require('../models/petModel');

const TARGET_EMAIL = process.env.SEED_OWNER_EMAIL || 'test@example.com';

// Default pets to create (reset to start)
const DEFAULT_PETS = [
  { name: 'Midnight', species: 'cat', avatarUrl: 'avatars/cacao.png' },
  { name: 'Cloud', species: 'cat', avatarUrl: 'avatars/cacao.png' },
  { name: 'Cacao', species: 'cat', avatarUrl: 'avatars/cacao.png' },
  { name: 'Yoko', species: 'cat', avatarUrl: 'avatars/cacao.png' },
  { name: 'Shadow', species: 'cat', avatarUrl: 'avatars/cacao.png' },
];

async function resetPetsForUser() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in your environment');
    }

    await connectDB();

    const user = await User.findOne({ email: TARGET_EMAIL });
    if (!user) {
      throw new Error(`User with email ${TARGET_EMAIL} not found`);
    }

    // Delete all existing pets owned by this user
    const deleteResult = await Pet.deleteMany({ owner: user._id });
    console.log(`Deleted ${deleteResult.deletedCount} existing pets for ${TARGET_EMAIL}`);

    // Create new pets from scratch (xp: 0, level: 1, mood: 'neutral')
    const newPets = [];
    for (const petData of DEFAULT_PETS) {
      const pet = await Pet.create({
        ...petData,
        owner: user._id,
      });
      newPets.push(pet);
      console.log(`Created pet: ${pet.name} (${pet.species})`);
    }

    console.log(`Created ${newPets.length} new pets for ${TARGET_EMAIL}`);
  } catch (err) {
    console.error('Pet seeding failed:', err);
    throw err;
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

resetPetsForUser()
  .then(() => console.log('Pet seeding complete'))
  .catch(() => process.exit(1));

