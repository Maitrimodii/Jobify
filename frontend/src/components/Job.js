import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import JobCard from './JobCard';

const Job = ({ jobs, onPageChange, page }) => {
  const [selectedJob, setSelectedJob] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle job selection
  const handleSelected = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Redux setup
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { employeeId } = useSelector((state) => state.employeeId);

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  // Function to handle job application
  const handleApply = () => {
    axios.post('/api/jobapplication/apply', { employeeId: employeeId, jobId: selectedJob._id, status: 'pending' }, config)
      .then((response) => {
        console.log("Successfully applied");
        toast.success("Your application has been sent");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const buttonName = "View Details";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-6 sm:py-12">
      {/* JobCard Component */}
      <JobCard jobs={jobs} handleSelected={handleSelected} onPageChange={onPageChange} buttonName={buttonName} page={page} />

      {/* Modal for Job Details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="relative w-full bg-white p-8 rounded-md mx-auto my-12 min-w-md md:h-auto  max-w-xl"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        ariaHideApp={false}
      >
        <button
          onClick={closeModal}
          className="text-lg absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          X
        </button>
        <div className="flex flex-col">
          <div className="mb-4">
            <p className="font-bold text-xl text-center mb-2">Job Details</p>
            <hr className="border-t-2 border-gray-200" />
          </div>
          {/* Job Details */}
          <div className="flex items-start mb-4">
            <p className="font-bold w-1/2 p-2">Position: </p>
            <p className="w-1/2 p-2">{selectedJob.position}</p>
          </div>
          <div className="flex items-start mb-4">
            <p className="font-bold w-1/2 p-2">Salary: </p>
            <p className="w-1/2 p-2">{selectedJob.Salary}</p>
          </div>
          <div className="flex items-start mb-4">
            <p className="font-bold w-1/2 p-2">Experience :</p>
            <p className="w-1/2 p-2">{selectedJob.experience}</p>
          </div>
          <div className="flex items-start mb-4">
            <p className="font-bold w-1/2 p-2">Apply By: </p>
            <p className="w-1/2 p-2">{selectedJob.applyBy}</p>
          </div>
          <div className="flex items-start mb-4">
            <p className="font-bold w-1/2 p-2">Skill: </p>
            <p className="w-1/2 p-2">{selectedJob.skill}</p>
          </div>
          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Apply
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Job;
