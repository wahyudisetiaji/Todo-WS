var express = require('express');
var router = express.Router();
const TaskController = require('../controllers/task-controller');

/* GET taks listing. */
router.get('/:token', TaskController.findTask)
router.get('/task/:id', TaskController.findOneTask)
router.get('/priority/:token', TaskController.findTaskPriority)
router.get('/done/:token', TaskController.findTaskDone)
router.post('/:token', TaskController.createTask);
router.delete('/:id', TaskController.deleteTask);
router.put('/:id', TaskController.updateTask);
router.put('/status/:id', TaskController.updateStatusTask)


module.exports = router;