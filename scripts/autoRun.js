const Pet = require('../models/petModel');
const Task = require('../models/taskModel');

async function generateDailyTasks(timeOfDay) {
    const tasks = [];
    // Litter boxes (3 total)
    for (let i = 0; i < 3; i++) {
        tasks.push({
            petType: 'cat',
            type: 'clean',
            timeOfDay,
            xpReward: 10,
            label: 'Clean litter box',
        });
    }

    // Dry food bowls (8 total, shared)
    for (let i = 0; i < 8; i++) {
        tasks.push({
            petType: 'cat',
            type: 'refill',
            timeOfDay,
            xpReward: 5,
            label: 'Refill dry food bowl',
        });
    }

    // Water bowls (3 total, shared)
    for (let i = 0; i < 3; i++) {
        tasks.push({
            petType: 'cat',
            type: 'refill',
            timeOfDay,
            xpReward: 5,
            label: 'Refill water bowl',
        });
    }

    tasks.push({
        petType: 'guineaPig',
        type: 'feed',
        timeOfDay,
        xpReward: 10,
        label: 'Feed hay',
    });

    tasks.push({
        petType: 'guineaPig',
        type: 'refill',
        timeOfDay,
        xpReward: 5,
        label: 'Refill water',
    });
    return tasks;
}

async function updateAllTasksPetType(petType) {
    const tasks = await Task.find({ petType: { $exists: false } });
    for (const task of tasks) {
        task.petType = petType;
        await task.save();
    }
}

module.exports = { generateDailyTasks, updateAllTasksPetType };