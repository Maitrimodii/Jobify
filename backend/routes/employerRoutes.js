const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createEmployerProfile,
  getEmployerProfile,
  updateEmployerProfile,
} = require('../controllers/employerController');

// Routes for Employer
router.post('/profile', protect, createEmployerProfile);
router.get('/profile', protect, getEmployerProfile);
router.put('/profile', protect, updateEmployerProfile);

module.exports = router;
