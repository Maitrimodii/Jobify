const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    workType:{
        type:String,
        enum:['full-time','part-time','internship','remote'],
        default:'full-time',
    },
    workLocation:{
        type:String,
        default:'work from home',
        required:true,
    },
    salary:{
        type:String,
        //required:true,
    },
    experience:{
        type:String,
        //required:true,
    },
    applyBy:{
        type:String,
        //required:true,
    },
    skill:[{
        type:String,
        // required:true,
    }],
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobApplication',
        },
    ],
},
{timestamps:true},
)

const Job = mongoose.model('Job',jobSchema);
module.exports = Job;
