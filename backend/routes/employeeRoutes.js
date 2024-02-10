const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createEmployeeProfile,
  getEmployeeProfile,
  updateEmployeeProfile,
  getMyApplication,
} = require('../controllers/employeeController');

router.post('/profile', protect, createEmployeeProfile);
router.get('/profile', protect, getEmployeeProfile);
router.put('/profile', protect, updateEmployeeProfile);
router.get('/myApplications',protect,getMyApplication);

module.exports = router;
