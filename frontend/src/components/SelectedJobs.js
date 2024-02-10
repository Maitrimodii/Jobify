import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import EmployeeDetail from './EmployeeDetail';

const SelectedJobs = ({ handleBackToJobs, selectedJob }) => {
  // State to track selected employee for detailed view
  const [employee, setEmployee] = useState(null);

  // Function to handle viewing details of a specific employee
  const handleViewDetails = (employee) => {
    setEmployee(employee);
  };

  // Function to go back to the list of jobs or applications
  const handleBackApplication = () => {
    setEmployee(null);
  };

  return (
    <div className="container mx-auto p-10">
      {/* Check if an employee is selected for detailed view */}
      {employee ? (
        // Display detailed view of the selected employee
        <EmployeeDetail employee={employee} handleBackApplication={handleBackApplication} />
      ) : (
        // Display job details and applications list
        <>
          {/* Back button to return to the list of jobs or applications */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            onClick={handleBackToJobs}
          >
            <FaArrowLeft />
          </button>
          {/* Job details and applications list */}
          <div className="bg-white p-6 rounded-md shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
            <hr />
            <p className='mt-2 mb-2'>
              <span className="font-bold">Position:</span> {selectedJob.position}
            </p>
            <p className='mt-2 mb-2'>
              <span className="font-bold">Work Location:</span> {selectedJob.workLocation}
            </p>
            <hr />
            <h2 className="text-2xl font-semibold mt-6 mb-4">Applications</h2>
            {/* List of job applications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedJob.applications.map((application) => (
                <div
                  key={application.employeeId._id}
                  className="bg-gray-100 p-4 rounded-md flex justify-between items-center mb-4"
                >
                  <p className="font-bold text-lg">{application.employeeId.fullName}</p>
                  {/* Button to view details of the selected employee */}
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      handleViewDetails(application);
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedJobs;
