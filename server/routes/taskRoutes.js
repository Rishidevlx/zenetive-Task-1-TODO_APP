const express = require('express');
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);
router.route('/:id/status').patch(protect, updateTaskStatus);

module.exports = router;
