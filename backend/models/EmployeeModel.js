const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  education: [{
    degree: String,
    institution: String,
    graduationYear: Number,
  }],
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
  }],
  certifications: [{
    title: String,
    issuer: String,
    issueDate: Date,
  }],
  projects: [{
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
  }],
  jobApplication:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'JobApplication',
    required:true,
  }],
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
