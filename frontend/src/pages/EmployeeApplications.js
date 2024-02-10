import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

const EmployeeApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);

  const userLogin = useSelector((State) => State.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .get('/api/employees/myApplications', config)
      .then((response) => {
        setJobApplications(response.data.jobApplications);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo]);

  const buttonColor = (status) => {
    if (status === 'approved') {
      return 'bg-green-400';
    } else if (status === 'rejected') {
      return 'bg-red-400';
    } else if (status === 'pending') {
      return 'bg-blue-400';
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 max-w-4xl mx-auto p-8 rounded-xl min-w-2xl shadow-lg border mt-10">
      <h2 className='text-2xl text-center font-bold mb-4'>My Applications</h2>
      {jobApplications.length >= 1 ? (
        jobApplications.map((application) => (
          <div
            key={application._id}
            className="mb-2 bg-white shadow-md shadow-gray-100 w-full flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-5 py-4 rounded-md hover:shadow-lg"
          >
            <div>
              <span className="font-bold mt-px">{application.jobId.position}</span>
              <h3 className="text-blue-800 text-sm">{application.jobId.company}</h3>
              <div className="flex items-center justify-between gap-5 mt-2">
                <span
                  className={`rounded-full px-3 py-1 text-white text-sm ${buttonColor(application.status)}`}
                >
                  {application.status}
                </span>
                <span className="text-slate-600 text-sm flex gap-1 items-center">
                  <CiCalendar />
                  Applied on {moment(application.createdAt).format('Do MMM YYYY')}
                </span>
                <span className="text-slate-600 text-sm flex gap-1 items-center">
                  <IoLocationOutline />
                  Applicants {application.jobId.applications.length}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-gray-500">You have not applied for a job</p>
      )}
    </div>
  );
};

export default EmployeeApplications;
