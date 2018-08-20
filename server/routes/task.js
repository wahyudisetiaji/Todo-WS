var express = require('express');
var router = express.Router();
const isLogin = require('../middlewares/isLogin')
const TaskController = require('../controllers/task-controller');

/* GET taks listing. */
router.get('/', isLogin, TaskController.findTask)
router.get('/task/:id', isLogin, TaskController.findOneTask)
router.get('/priority/:token', TaskController.findTaskPriority)
router.get('/done/:token', TaskController.findTaskDone)
router.post('/', isLogin, TaskController.createTask);
router.delete('/:id', isLogin, TaskController.deleteTask);
router.put('/:id', TaskController.updateTask);
router.put('/status/:id', TaskController.updateStatusTask)


module.exports = router;