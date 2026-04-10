const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const taskController = require('../controllers/tasks.controller');
const authorize = require('../middlewares/authorize');
const validateTask = require('../middlewares/tasks.middleware');

router.get('/xml', taskController.getAllTasksXML);
router.get('/',authorize(['admin', 'user']),authenticate, taskController.getAllTasks);

router.get('/:id', authorize(['admin', 'user']),authenticate,taskController.getOneTask);

router.post('/',authorize(['admin', 'user']),authenticate, validateTask, taskController.createTask);
router.put('/:id',authorize(['admin']),authenticate, validateTask, taskController.updateTask);

router.delete('/:id',authorize(['admin']),authenticate, taskController.deleteTask);

module.exports = router;