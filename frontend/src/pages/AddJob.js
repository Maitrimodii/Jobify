import React, { useState } from 'react';
import AddJobForm from './AddJobForm';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddJob = () => {
  const [job, setJob] = useState({
    company: "",
    position: "",
    workType: "full-time",
    workLocation: "",
    salary: "",
    experience: "",
    applyBy: "",
    skill: [],
  });
  
    const userLogin = useSelector((state) => state.userLogin);
    const userInfo = userLogin.userInfo;

    const handleFormSubmit = (e) => {
      console.log("Current job state:", job); 
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      axios
        .post('/api/jobs/create-job', job, config)
        .then((response) => {
          console.log({ job: response.data }); 
          toast.success('Job is posted successfully');
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.message);
        });
    };
    
    return (
      <div className="container mx-auto mt-10">
        <AddJobForm
          job={job}
          setJob={setJob}
          onSubmit={handleFormSubmit}
          buttonName="Create"
        />
      </div>
    );
  };
  

export default AddJob;
