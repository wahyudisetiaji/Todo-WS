var express = require('express');
var router = express.Router();
const TaksController = require('../controllers/taks-controller');

/* GET taks listing. */
router.get('/', TaksController.findTask)
router.post('/', TaksController.createTaks);
router.delete('/:id', TaksController.deleteTaks);
router.put('/:id', TaksController.updateTaks);


module.exports = router;