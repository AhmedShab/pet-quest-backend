const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/:petType', taskController.getTasks);
router.get('/:id', taskController.getTasksByPet); 
router.post('/', taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.patch('/:id/complete', taskController.completeTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
