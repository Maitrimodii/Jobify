const mongoose = require('mongoose');

const jobApplicationSchema =new mongoose.Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true,
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true,
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending',
    }
},{timestamps:true});

const JobApplication = mongoose.model('JobApplication',jobApplicationSchema);
module.exports  = JobApplication;