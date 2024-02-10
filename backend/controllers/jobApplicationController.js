const mongoose = require('mongoose');
const JobApplication = require('../models/JobApplication');
const asyncHandler = require('express-async-handler');
const Job = require('../models/JobModel');
const Employee = require('../models/EmployeeModel');

// @desc    job application post by employee
// @route   POST /api/jobApplication/apply
// @access  Private
const postJobApplication = asyncHandler(async(req,res,next)=>{
    try{
        //const jobId = req.job.id;
        //const employeeId = req..id;
        
        const {employeeId,jobId,status} = req.body;
    
        const existingApplication = await JobApplication.findOne({
            jobId,
            employeeId,
        })
        if (existingApplication) {
            return res.status(400).json({ message: 'Employee has already applied for this job' });
          }
        const application = await JobApplication.create({
            jobId,
            employeeId,
            status,
        });

        await Job.findByIdAndUpdate(jobId, { $push: { applications: application._id } });
        await Employee.findByIdAndUpdate(employeeId, { $push: { jobApplication: application._id } });
        res.status(201).json(application);
    }catch(error){
        next(error);
    }
})

//@desc employer approve or reject the application
//@route POST/api/jobapplication/status
//@access Private
const ApplicationStatus = (asyncHandler(async (req, res, next) => {
    const { applicationId, status } = req.body;

    const application = await JobApplication.findOne({ _id:applicationId });
    
    if (application.status === "approved" || application.status === "rejected") {
        return res.status(400).json({ message: `Your response has already been submitted and you have ${application.status}` });
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(applicationId, { status }, { new: true });

    res.status(200).json(updatedApplication);
}));


module.exports = { postJobApplication,ApplicationStatus }

