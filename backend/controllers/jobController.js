const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Job = require('../models/JobModel');

// @desc    Post a job
// @route   POST /api/jobs/create-job
// @access  Private
const postJob = asyncHandler(async (req, res, next) => {
  try {
    const { company, position, workType, workLocation, startDate, salary, experience, applyBy, skill } = req.body;

    const createdBy = req.user.id;

    const newJob = await Job.create({
        company,
        position,
        workType,
        workLocation,
        createdBy,
        startDate,
        salary,
        experience,
        applyBy,
        skill,
    });
      
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

// @desc    Get all jobs posted by specific employer
// @route   GET /api/jobs/get-my-job
// @access  Private
const getMyJobs = asyncHandler(async (req, res, next) => {
  try {
    const createdBy = req.user.id;
    const { position, workLocation, workType, page, pageSize, keyWordSearch, sort } = req.query;

    const filterObject = { createdBy };

    if (position) {
      filterObject.position = { $regex: new RegExp(position, 'i') };
    }
    if (workLocation) {
      filterObject.workLocation = { $regex: new RegExp(workLocation, 'i') };
    }
    if (workType) {
      filterObject.workType = workType;
    }

    if (keyWordSearch) {
      const keywordSearchRegex = new RegExp(keyWordSearch, 'i');
      filterObject.$or = [
        { position: keywordSearchRegex },
        { workLocation: keywordSearchRegex },
        { workType: keywordSearchRegex },
        { company: keywordSearchRegex },
      ];
    }

    const jobs = await Job.find(filterObject)
      .populate({
        path: 'applications',
        populate: {
          path: 'employeeId',
          model: 'Employee',
        },
      })
      .sort({ createdAt: sort === 'newest' ? -1 : 1 })
      .skip(Math.max(0, (Number(page) - 1) * Number(pageSize)))
      .limit(Number(pageSize) || 10);

    res.status(200).json({ jobs });
  } catch (error) {
    next(error);
  }
});

//@desc get details of employee who has applied for job
//@route GET/api/jobs/get-applications
//@access Private
// const getJobApplications = asyncHandler(async(req,res,next)=>{
//   try{
//     const jobId = req.body;

//     const employeeId = await Job.find({jobId}).populate('EmployeeId');

 
//   }catch(error){
//     next(error);
//   }
// })

// @desc    Get all posted jobs
// @route   GET /api/jobs/all-jobs
// @access  Private
const getAllJobs = asyncHandler(async (req, res, next) => {
  try {
    const { position, workLocation, workType, page, pageSize, keyWordSearch, sort } = req.query;

    const filterObject = {};

    if (position) {
      filterObject.position ={ $regex: new RegExp(position, 'i') };
    }
    if (workLocation) {
      filterObject.workLocation = { $regex: new RegExp(workLocation, 'i') };
    }
    if (workType) {
      filterObject.workType = workType; 
    }
    

    // Apply filters
    let filterJobs = await Job.find(filterObject);
   // console.log('Filter Object:', filterJobs);

    // Apply keyword search
    if (keyWordSearch) {
      const keywordSearchRegex = new RegExp(keyWordSearch, 'i');
      console.log('keywordSearchRegex:', keywordSearchRegex);
    
      filterJobs = filterJobs.filter((job) => (
        job.position.match(keywordSearchRegex) ||
        job.workLocation.match(keywordSearchRegex) ||
        job.workType.match(keywordSearchRegex) ||
        job.company.match(keywordSearchRegex)
      ));
      console.log('filterjobs', filterJobs);
    }
    

    // Apply sorting
    const sortedJobs = filterJobs.sort((a, b) => {
      if (sort === 'oldest') {
        return a.createdAt - b.createdAt;
      } else if (sort === 'newest') {
        return b.createdAt - a.createdAt;
      }
      return 0;
    });

    // Apply Pagination
    const pages = Number(page) || 1;
    const limit = Number(pageSize) || 10;
    const startIndex = (pages - 1) * limit;
    const endIndex = pages * limit;

    const paginatedJobs = sortedJobs.slice(startIndex, endIndex);

    res.status(200).json({ jobs: paginatedJobs });
  } catch (error) {
    next(error);
  }
});

//@desc get Job details
//@route GET/ api/jobs/get-job/:jobId
//@access Private
const getJobDetails = asyncHandler(async (req, res, next) => {
  try{
    const { jobId } = req.params;
    
    console.log(jobId);
   
    const job = await Job.findOne({_id:jobId});
    
    console.log("job", job);
    res.status(200).json({job});

  } catch(error){
    next(error);
  }
})
//@desc update job details
//@route PUT /api/jobs/update-job/:jobId
//@access Private
const updateJob = asyncHandler(async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== userId.toString()) {
      return res.status(400).json({ message: "Invalid Employer" });
    }

    Object.assign(job, req.body);

    await job.save();

    res.status(200).json({ message: "Job updated successfully", job });
  } catch(error){
    next(error);
  }
})

//@desc delete job
//@route DELETE /api/jobs/delete-job/:jobId
//@access Private
const deleteJob = asyncHandler(async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully', deletedJob });
  } catch (error) {
    next(error);
  }
});
module.exports = { postJob, getMyJobs, getAllJobs, deleteJob, updateJob, getJobDetails };
