import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmployeeDetail = ({ employee, handleBackApplication }) => {
  // Redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Navigation hook
  const navigate = useNavigate();

  // Function to update application status
  const handleStatus = (value) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .put('/api/jobapplication/status', { applicationId: employee._id, status: value }, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          toast.success(error.response.data.message);
        }
      });
  };

  // Function to initiate a chat
  const handleChat = async (receiverId) => {
    try {
      const response = await axios.post(
        '/api/chat/create',
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const chatId = response.data._id;

      navigate(`/chatDisplay/${chatId}/${receiverId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Back button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleBackApplication}>
        <FaArrowLeft />
      </button>

      {/* Applicant Details */}
      <div className="mx-auto max-w-xl min-w-lg flex flex-col text-gray-600 justify-center">
        <div className="border p-8 rounded">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">Applicant Details</h2>
          <hr />

          {/* Skills */}
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            {employee.employeeId.skills && (
              <>
                <h3 className="font-bold py-4 w-1/4">Skills:</h3>
                <p className="px-4 py-4 w-3/4">{employee.employeeId.skills}</p>
              </>
            )}
          </div>

          {/* Education Details */}
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            {employee.employeeId.education && employee.employeeId.education.length > 0 && (
              <>
                <h3 className="font-bold py-4 w-1/4">Education Details:</h3>
                {employee.employeeId.education.map((educationItem, index) => (
                  <div key={index} className="px-4 py-4 w-3/4">
                    <p>Degree: {educationItem.degree}</p>
                    <p>Institution: {educationItem.institution}</p>
                    <p>Graduation Year: {educationItem.graduationYear}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Experience */}
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            {employee.employeeId.experience && employee.employeeId.experience.length > 0 && (
              <>
                <h3 className="font-bold py-4 w-1/4">Experience:</h3>
                {employee.employeeId.experience.map((experienceItem, index) => (
                  <div key={index} className="px-4 py-4 w-3/4">
                    <p>Position: {experienceItem.title}</p>
                    <p>Company: {experienceItem.company}</p>
                    <p>Start Date: {experienceItem.startDate}</p>
                    <p>End Date: {experienceItem.endDate}</p>
                    <p>Description: {experienceItem.description}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Certifications */}
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            {employee.employeeId.certifications && employee.employeeId.certifications.length > 0 && (
              <>
                <h3 className="font-bold py-4 w-1/4">Certifications:</h3>
                {employee.employeeId.certifications.map((certificationsItem, index) => (
                  <div key={index} className="px-4 py-4 w-3/4">
                    <p>Title: {certificationsItem.title}</p>
                    <p>Issuer: {certificationsItem.issuer}</p>
                    <p>Issuer Date: {certificationsItem.issueDate}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Projects */}
          <div className="mb-4 mt-4 text-gray-500 flex items-start">
            {employee.employeeId.projects && employee.employeeId.projects.length > 0 && (
              <>
                <h3 className="font-bold py-4 w-1/4">Projects:</h3>
                {employee.employeeId.projects.map((projectsItem, index) => (
                  <div key={index} className="px-4 py-4 w-3/4">
                    <p>Title: {projectsItem.title}</p>
                    <p>Description: {projectsItem.description}</p>
                    <p>Start Date: {projectsItem.startDate}</p>
                    <p>End Date: {projectsItem.endDate}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mb-4 mt-4 text-gray-500 flex justify-between">
            {/* Approve Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md  mr-2 w-1/2"
              value="approved"
              onClick={() => {
                handleStatus('approved');
              }}
            >
              Approve
            </button>
            {/* Reject Button */}
            <button
              className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md  w-1/2"
              value="rejected"
              onClick={() => {
                handleStatus('rejected');
              }}
            >
              Reject
            </button>
            {/* Chat Button */}
            <button
              className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md w-1/2"
              value="rejected"
              onClick={() => {
                handleChat(employee.employeeId.userId);
              }}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;
