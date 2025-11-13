const Pet = require('../models/petModel');
const Task = require('../models/taskModel');

async function generateDailyTasks(timeOfDay) {
    const pets = await Pet.find(); // Get all pets
    const tasks = [];

    // 🐱 Cat Tasks
    const catIds = pets.filter(p => p.species === 'cat').map(p => p._id);

    // Litter boxes (3 total)
    for (let i = 0; i < 3; i++) {
        tasks.push({
            type: 'clean',
            timeOfDay,
            xpReward: 10,
            label: 'Clean litter box',
        });
    }

    // Dry food bowls (8 total, shared)
    for (let i = 0; i < 8; i++) {
        tasks.push({
            type: 'refill',
            timeOfDay,
            xpReward: 5,
            label: 'Refill dry food bowl',
        });
    }

    // Water bowls (3 total, shared)
    for (let i = 0; i < 3; i++) {
        tasks.push({
            type: 'refill',
            timeOfDay,
            xpReward: 5,
            label: 'Refill water bowl',
        });
    }

    // 🐹 Guinea Pig Tasks
    const guineaPig = pets.find(p => p.species === 'guineaPig');
    if (guineaPig) {
        tasks.push({
            type: 'feed',
            timeOfDay,
            xpReward: 10,
            label: 'Feed hay',
        });

        tasks.push({
            type: 'feed',
            timeOfDay,
            xpReward: 10,
            label: 'Feed dry food',
        });

        tasks.push({
            type: 'refill',
            timeOfDay,
            xpReward: 5,
            label: 'Refill water',
        });
    }

    // Save all tasks
    await Task.insertMany(tasks.map(task => ({
        ...task,
        completed: false,
        date: new Date()
    })));
}

async function updateAllTasksPetType(petType) {
    const tasks = await Task.find({ petType: { $exists: false } });
    for (const task of tasks) {
        task.petType = petType;
        await task.save();
    }
}

module.exports = { generateDailyTasks, updateAllTasksPetType };