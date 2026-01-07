const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all users - admin and moderator only
router.get('/', authorize('admin', 'moderator'), getAllUsers);

// Get user by ID - admin and moderator only
router.get('/:id', authorize('admin', 'moderator'), getUserById);

// Update user - admin only
router.put('/:id', authorize('admin'), updateUser);

// Delete user - admin only
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
