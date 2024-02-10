const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  companyName: {
    type: String,
  },
  position: {
    type: String,
  },
  companyDetails: {
    type: String,
  },
  postedJobs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'JobApplication',
    required:true,
  }],
}, { timestamps: true });

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
