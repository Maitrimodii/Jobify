const express = require('express');
const { postJobApplication, ApplicationStatus } = require('../controllers/jobApplicationController');
const {protect}  = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/apply',protect,postJobApplication);
router.put('/status',protect,ApplicationStatus);

module.exports =router;