const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const {createTask,getTasks,updateTask,deleteTask} = require('../controllers/taskController');

router.post('/',authMiddleware,createTask);
router.get('/',authMiddleware,getTasks);
router.patch('/:id', authMiddleware, updateTask); // ✅ VERY IMPORTANT
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
