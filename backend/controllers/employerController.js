const asyncHandler = require('express-async-handler');
const Employer = require('../models/EmployerModel');

// @desc    Create a new employer profile
// @route   POST /api/employers/profile
// @access  Private
const createEmployerProfile = asyncHandler(async (req, res, next) => {
  const { companyName, position, companyDetails } = req.body;
  const userId = req.user._id;

  const employer = await Employer.create({
    userId,
    companyName,
    position,
    companyDetails,
  });

  res.status(201).json({ employer });
});

//@desc    Get employer profile
// @route   GET /api/employers/profile
// @access  Private
const getEmployerProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  console.log('User ID:', userId);

  let employer = await Employer.findOne({ userId });
  console.log('Employer Profile:', employer);

    if (!employer) {
      console.log('Employer profile not found. Creating a new profile for user ID:', userId);
      employer = await Employer.create({
        userId,
        companyName: '',
        position: '',
        companyDetails: '',
      });
    }

    res.json(employer);
  
});

// @desc    Update employer profile
// @route   PUT /api/employers/profile
// @access  Private
const updateEmployerProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const employer = await Employer.findOne({ userId });

    if (!employer) {
        res.status(404);
        return next(new Error('Employer Profile not found'));
    }

  employer.companyName = req.body.companyName ?? employer.companyName;
  employer.position = req.body.position ?? employer.position;
  employer.companyDetails = req.body.companyDetails ?? employer.companyDetails;

  const updatedEmployer = await employer.save();

  res.json(updatedEmployer);
});

module.exports = { createEmployerProfile, getEmployerProfile, updateEmployerProfile };
