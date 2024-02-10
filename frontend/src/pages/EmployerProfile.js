import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployerProfile = () => {
  const [profileData, setProfileData] = useState({
    companyName: '',
    position: '',
    companyDetails: '',
  });

  const userLogin = useSelector((State)=>State.userLogin);
  const {userInfo} = userLogin;
  const navigate = useNavigate();

   useEffect(()=>{
    if(!userInfo){
      navigate('/login');  
      return;  
    }
    const config = {
      headers:{
        Authorization:`Bearer ${userInfo.token}`,
      },
    }
    axios.get('/api/employers/profile',config)
    .then((response)=>setProfileData(response.data))
    .catch((error)=>console.log(error));

  },[userInfo,navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log('Form submitted:', profileData);
    const config = {
      headers:{
        Authorization:`Bearer ${userInfo.token}`,
      },
    }
    axios.put('/api/employers/profile',profileData,config)
    .then((response)=>{
      console.log("profile updated successfully")
      toast.success("Profile updated successfully")
    })
    .catch((error)=>{
      console.log(error)
      toast.error(error.response.data.message)
    })
  };

  return (
    <div className="flex items-center justify-center h-screen text-gray-500">
      <div className="container max-w-2xl w-full mx-auto p-8 border border-gray-300 rounded">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">Profile</h2>
      <form onSubmit={handleSubmit} >
        <div className='flex'>
          <label className="w-1/4 block mb-4 py-2" htmlFor="companyName">
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={profileData.companyName}
            className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleChange}
          />
        </div>
        <div className='flex'>
          <label className="w-1/4 block mb-4 py-2" htmlFor="position">
            Position:
          </label>
          <input
          type="text"
          id="companyName"
          name="companyName"
          value={profileData.position}
          className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleChange}
          />
        </div>
        
        <div className='flex'>
          <label className="w-1/4 block mb-4 py-2" htmlFor="companyDetails">
            Company Details:
          </label>
          <textarea
            id="companyDetails"
            name="companyDetails"
            value={profileData.companyDetails}
            className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save
        </button>
      </form>
    </div>
    </div>
  );
};

export default EmployerProfile;
