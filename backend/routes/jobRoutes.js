const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { postJob, getMyJobs, getAllJobs, updateJob, deleteJob, getJobDetails } = require('../controllers/jobController');

const router = express.Router();


router.post('/create-job', protect, postJob);
router.get('/get-my-job', protect, getMyJobs);
router.get('/all-jobs', protect, getAllJobs);
router.get('/get-job/:jobId', protect, getJobDetails )
router.put('/update-job/:jobId', protect, updateJob);
router.delete('/delete-job/:jobId', protect, deleteJob);


module.exports = router;
