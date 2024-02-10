const asyncHandler = require('express-async-handler');
const Employee = require('../models/EmployeeModel');

// @desc    Create a new employee profile
// @route   POST /api/employees/profile
// @access  Private
const createEmployeeProfile = asyncHandler(async(req, res, next)=> {
    const { fullName, skills, education, experience, certifications, projects } = req.body;
    const userId = req.user._id;

    const employee = await Employee.create({
        userId, fullName, skills, education, experience, certifications, projects
    });

    res.status(201).json({ employee });
});

// @desc    Get employee profile
// @route   GET /api/employees/profile
// @access  Private

    const getEmployeeProfile = asyncHandler(async (req, res, next)=>{
        const userId = req.user._id;
    
        let employee = await Employee.findOne({ userId });
    
        if (!employee) {
            employee = await Employee.create({
                userId,
                fullName: '', 
                skills: [],
                education: [],
                experience: [],
                certifications: [],
                projects: [],
            });
        }
    
        res.json(employee);
    });
    

// @desc    Update employee profile
// @route   PUT /api/employees/profile
// @access  Private
const updateEmployeeProfile = asyncHandler(async(req, res, next)=>{
    const userId = req.user._id;

    const employee = await Employee.findOne({ userId });

    if (!employee){
        res.status(404);
        return next(new Error('Employee Profile not found'));
    }

    employee.fullName = req.body.fullName ?? employee.fullName;
    employee.skills = req.body.skills ?? employee.skills;
    employee.education = req.body.education ?? employee.education;
    employee.experience = req.body.experience ?? employee.experience;
    employee.certifications = req.body.certifications ?? employee.certifications;
    employee.projects = req.body.projects ?? employee.projects;

    const updatedEmployee = await employee.save();

    res.json(updatedEmployee);
});

//@desc get applications of job of employee
//@route GET/api/employees/myapplications
//@access Private 
const getMyApplication = asyncHandler(async(req, res, next)=>{
    try {
        const user = req.user._id;

        const employee = await Employee.findOne({ userId:user }).populate({
            path: 'jobApplication',
            populate:{
                path:'jobId',
                model:'Job',
            }
        })

        if(!employee){
            return res.status(404).json({ message: "Employee not found" });
        }

        const jobApplications = employee.jobApplication;

        res.status(200).json({ jobApplications });   
    }catch (error){
        next(error);
    }
});

module.exports = {createEmployeeProfile,getEmployeeProfile,updateEmployeeProfile,getMyApplication };
