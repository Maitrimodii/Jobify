import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddJobForm from './AddJobForm';

const UpdateJob = () => {
  // State and variable declarations
  const [job, setJob] = useState({
    company: '',
    position: '',
    workType: 'full-time',
    workLocation: '',
    salary: '',
    experience: '',
    applyBy: '',
    skill: [],
  });

  const { jobId } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const [loading, setLoading] = useState(true);

  // Fetch job data function
  const fetchJobData = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/jobs/get-job/${jobId}`, config);
      setJob(response.data.job);
    } catch (error) {
      console.error('Error fetching job data:', error);
    } finally {
      setLoading(false);
    }
  }, [jobId, userInfo.token]);

  // useEffect to fetch job data on component mount
  useEffect(() => {
    fetchJobData();
  }, [fetchJobData]);

  // Update job function
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(`/api/jobs/update-job/${jobId}`, job, config);
      setJob(response.data.job);
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setLoading(false);
    }
  };

  // Form submission function
  const handleFormSubmit = (e) => {
    handleUpdate();
  };

  const buttonName = 'Update';

  // Component rendering
  if (job && job.company) {
    return (
      <AddJobForm
        job={job}
        setJob={setJob}
        onSubmit={handleFormSubmit}
        buttonName={buttonName}
      />
    );
  }
};

export default UpdateJob;
