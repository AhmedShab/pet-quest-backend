const Task = require('../models/taskModel');
const Pet = require('../models/petModel');
const { computeLevel } = require('../helpers/level');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tasks (optionally filter by petId or type)
exports.getTasks = async (req, res) => {
  const { petType } = req.params;
  
  try {
    const tasks = await Task.find({ petType, user: req.user.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByPet = async (req, res) => {
  const id = req.params.id;
  try {
    const tasks = await Task.find({ petId: id })
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a task (e.g., change due date or type)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mark task as complete and update pet XP
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });    

    if (task.completed) {
      return res.status(400).json({ error: 'Task already completed' });
    }
    
    task.completed = true;
    await task.save();

    // Update pet XP
    const pets = await Pet.find({ species: task.petType });
    
    await Promise.all(
      pets.map(async pet => {
        pet.xp += task.xpReward;
        pet.level = computeLevel(pet.xp);
        await pet.save();
      })
    );

    res.status(200).json({ task, pets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
