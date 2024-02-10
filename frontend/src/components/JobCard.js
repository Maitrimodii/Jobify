import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GrNext } from 'react-icons/gr';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const JobCard = ({ jobs, handleSelected, onPageChange, buttonName, page }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;

  const navigate = useNavigate();

  // Function to navigate to the job update page
  const handleUpdateButton = (jobId) => {
    navigate(`/updateJob/${jobId}`);
  };

  // Function to handle job deletion
  const handleDeleteButton = (jobId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .delete(`/api/jobs/delete-job/${jobId}`, config)
      .then((response) => {
        console.log('Successful deletion:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting job:', error);
      });
  };

  return (
    <>
      {jobs.map((job) => (
        <div
          key={job._id}
          className="mb-2 bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-5 py-4 rounded-md"
        >
          {/* Job Information */}
          <div>
            <span className="font-bold mt-px">{job.position}</span>
            <h3 className="text-blue-800 text-sm">{job.company}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm">{job.workType}</span>
              <span className="text-slate-600 text-sm flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.workLocation}
              </span>
            </div>
          </div>

          {/* Buttons based on user role */}
          <div className={`flex ${userInfo.role === "employee" ? 'justify-between' : 'justify-end'} mr-5 items-center md:mt-2`}>
            {userInfo.role === "employer" &&
              <div className='flex text-xl'>
                <button onClick={() => handleUpdateButton(job._id)}>
                  <CiEdit className='mr-8 duration-200 md:text-md' />
                </button>
                <button onClick={() => handleDeleteButton(job._id)}>
                  <MdDelete className='duration-200 md:text-md mr-8' />
                </button>
              </div>
            }
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => handleSelected(job)}
            >
              <GrNext />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Buttons */}
      <div className="mb-2 bg-white shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 px-5 py-4 rounded-md">
        <p className='py-2 text-slate-600'>Showing {page} page</p>
        <button
          className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => onPageChange('prev')}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => onPageChange('next')}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default JobCard;
