const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('../config/db');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const { generateDailyTasks } = require('./autoRun');

async function getTaskSeeds() {
  const morningTasks = await generateDailyTasks('morning');
  return [
    {
      email: 'test@example.com',
      tasks: morningTasks,
    },
  ];
}

async function seedTasks() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in your environment');
    }

    await connectDB();

    const taskSeeds = await getTaskSeeds();

    for (const { email, tasks } of taskSeeds) {
      const user = await User.findOne({ email });
      if (!user) {
        console.warn(`Skipping tasks for ${email} (user not found)`);
        continue;
      }

      for (const taskData of tasks) {
        await Task.create({
          ...taskData,
          user: user._id,
        });

        console.log(`Created "${taskData.label}" for ${email}`);
      }
    }
  } catch (err) {
    console.error('Task seeding failed:', err);
    throw err;
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

seedTasks()
  .then(() => {
    console.log('Task seeding complete');
  })
  .catch(() => {
    process.exit(1);
  });

